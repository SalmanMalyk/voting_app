<?php

namespace App\Http\Controllers\Api\V1\Dispatcher;

use Carbon\Carbon;
use App\Models\Master\Town;
use App\Models\Master\Block;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\General\AppSetting;
use Illuminate\Support\Facades\DB;
use App\Enums\CustomerScheduleStatus;
use Illuminate\Support\Facades\Storage;
use App\Models\Module\Customer\Customer;
use App\Services\ScheduleInvoiceService;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Notification;
use App\Models\Module\Customer\CustomerBranch;
use App\Models\Reports\SchedulDelivery\ScheduleDelivery;
use App\Notifications\System\OrderNotDeliveredNotification;
use App\Models\Reports\SchedulDelivery\ScheduleDeliveryDetail;

class DispatcherController extends BaseController
{
    /**
     * Schedule Delivery List
     * 
     * Return list of scheduled deliveries that are assigned 
     * to the dispatcher and they're approved.
     * 
     * @header Authorization Bearer <auth-token>
     * @group Dispatcher API
     * @authenticated
     * @response 200 {
     *  "success": true,
     *  "data": {
     *      "id": 1,
     *      "tripe_no": "Trip-xxx-xx-xxx-xxxxx-xx"
     *  }
     *  "message": null 
     * }
     * 
     */
    public function getDeliverySchedule()
    {
        try {
            $scheduleDelivery = ScheduleDelivery::with([
                                    'helperUsers:id,name',
                                    'vehicle:id,manufacturer,plate_no'
                                ])
                                ->withCount([
                                    'details as total_customers_count',
                                    'details as delivered_customers_count' => function($query) {
                                        return $query->where('status', 4);
                                    }
                                ])
                                ->withSum(
                                    ['items as schedule_bottle_qty' => function ($query) {
                                        $query->where('product_id', 8);
                                    }],
                                    'bottle_qty'
                                )
                                ->withSum(
                                    ['items as actual_bottle_qty' => function ($query) {
                                        return $query->whereRelation('detail', 'status', 4);
                                    }],
                                    'actual_bottle_qty'
                                )
                                ->withSum(
                                    ['items as returned_bottle_qty' => function ($query) {
                                        return $query->whereRelation('detail', 'status', 4);
                                    }],
                                    'returned_bottle_qty'
                                )
                                ->withSum(
                                    ['details as cash_received' => function ($query) {
                                        return $query->where('status', 4);
                                    }],
                                    'cash_received'
                                )
                                ->where('dispatcher', auth()->id())
                                ->where('source_type', 'app')
                                ->whereIn('status', [2, 4, 7, 8])
                                ->whereDate('delivery_schedule', now()->format('Y-m-d'))
                                ->orderBy('assignment_date', 'DESC')
                                ->get()
                                ->append(['last_meter_reading']);


            return $this->sendResponse($scheduleDelivery);
        } catch (\Throwable $th) {
            return $this->sendError('Something went wrong.', $th->getMessage());
        }
    }

    /**
     * Schedule Delivery Detail List
     * 
     * Return list of scheduled delivery details which
     * contains the delivery list of customers.
     * 
     * @urlParam scheduleDelivery integer required The ID of the scheduleDelivery.
     * @header Authorization Bearer <auth-token>
     * @group Dispatcher API
     * @authenticated
     * @response 200 {
     *  "success": true,
     *  "message": null 
     * }
     * 
     */
    public function getDeliveryScheduleDetail(ScheduleDelivery $scheduleDelivery)
    {
        try {
            $data = $scheduleDelivery->details()
                                    ->with([
                                        'customerBranch:id,customer_id,branch_name,town_id,block_id,address,street,building,contact_person,longitude,latitude,last_paid_amount,last_paid_date,sum_sale,sum_receipts,bottle_cap',
                                        'customerBranch.customer:id,name,customer_type_id,special_customer',
                                        'customerBranch.block:id,name',
                                        'customerBranch.town:id,name',
                                        'customerBranch.invoices' => function($query) {
                                            return $query->status(2)
                                                        ->selectRaw('id,customer_branch_id,invoice_no,sum_invoice_amount, IFNULL(cash_received, 0) - IFNULL(change_return, 0) as cash_received, DATE_FORMAT(delivery_date, "%d-%b-%y") as date,bottle_returned')
                                                        ->withSum(
                                                            [
                                                                'entries as order_bottle_qty' => function ($query) {
                                                                    return $query->whereIn('product_id', [7,8,11,13]);                                                            
                                                                }
                                                            ],
                                                            'quantity'
                                                        )
                                                        ->orderBy('delivery_date', 'DESC')
                                                        ->limit(3);
                                        },
                                        'items'
                                    ])
                                    ->orderBy('order_no', 'asc')
                                    ->get()
                                    ->append(['reason_text', 'voucher_bottles']);
                                    
            return $this->sendResponse($data);
        } catch (\Throwable $th) {
            return $this->sendError(
            'Something went wrong.', 
            [
                'message' => $th->getMessage(),
                'code' => $th->getCode(),
                'file' => $th->getTrace()
            ], 500);
        }
    }


    /**
     * Set Schedule Delivery Dispatch/End
     *
     * Update schedule delivery according to passed
     * type i.e. start or end 
     * 
     * @urlParam scheduleDelivery integer required The ID of the scheduleDelivery.
     * @bodyParam   image    binary  required    Picture of meter reading.
     * @bodyParam   meter_reading    string  required    Meter reading in numbers.   Example: 12345.6
     * @bodyParam   type    string  required    type of submit.   Example: start/end
     * @header Authorization Bearer <auth-token>
     * @group Dispatcher API
     * @authenticated
     * @response 200 {
     *  "success": true,
     *  "message": null 
     * }
     * 
     */
    public function dispatchDeliverySchedule(Request $request, ScheduleDelivery $scheduleDelivery)
    {
        $request->validate([
            'image'         => 'required|image|mimes:jpg,png,jpeg',
            'meter_reading' => 'required|string',
            'type'          => 'required|in:start,end|string',
            'bottle_loaded' => 'required_if:type,start'
        ]);

        $image = $request->file('image');
        $extenstion = $image->getClientOriginalExtension();
        $date = now()->format('Y-m-d');
        $filename = time()."-". $request->type .".{$extenstion}";

        $image = Storage::disk('public')->putFileAs("meter_readings/{$date}/{$scheduleDelivery->vehicle->id}", $image, $filename);

        // TODO: update delivery schedule status according to sent type
        try {
            DB::beginTransaction();

            if ($request->type == 'start') {
                $scheduleDelivery->update([
                    'status'              => 4, // dispatched
                    'dispatch_date'       => now('PKT'),
                    'updated_by'          => auth()->id(),
                    'bottle_loaded'       => $request->bottle_loaded,
                    'meter_reading_start' => $request->meter_reading,
                ]);
            } elseif ($request->type == 'end') {
                $scheduleDelivery->update([
                    'status'            => 8, // finished
                    'completed_date'    => now('PKT'),
                    'updated_by'        => auth()->id(),
                    'meter_reading_end' => $request->meter_reading,
                ]);
            }

            // TODO: Store image according to schedule delivery
            $scheduleDelivery->attachments()->create([
                'path'        => $image,
                'added_by'    => auth()->id(),
                'description' => 'Meter Reading Image',
                'misc' => json_encode([
                    'type'           => 'meter_reading_' . $request->type,
                    'original_name'  => $request->file('image')->getClientOriginalName(),
                    'mime_type'      => $request->file('image')->getClientMimeType()
                ])
            ]);
            
            DB::commit();

            return $this->sendResponse(asset('storage/'.$image), 'Delivery schedule updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->sendError($th);
        }
    }


    /**
     * Complete Customer Schedule Delivery Order 
     *
     * complete customer delivery order if successfully then providing 
     * order data otherwise send un-deliver status
     * 
     * @urlParam scheduleDeliveryDetail integer required The ID of the scheduleDeliverydetail.
     * 
     * @bodyParam   status               boolean  required  Delivery status.                    Example: 1,0
     * @bodyParam   actual_bottle_qty    int      required  Bottle quantity customer taken.     Example: 5
     * @bodyParam   returned_bottle_qty  int      required  Bottle returned by customer.        Example: 5
     * @bodyParam   cash_received        int      required  Cash given by customer.             Example: 500
     * @bodyParam   reason               string   required  Only when status is false.Reason why order is not delivered.  Example: Address not found
     * @bodyParam   remarks              string   optional  Remarks about customer delivery.    Example: Any remarks
     * 
     * @header Authorization Bearer <auth-token>
     * @group Dispatcher API
     * @authenticated
     * @response 200 {
     *  "success": true,
     *  "message": "Order completed successfully" 
     * }
     * 
     */
    public function completeDeliveryOrder(Request $request, ScheduleDeliveryDetail $detail, ScheduleInvoiceService $scheduleInvoiceService)
    {
        // validate
        $data = $request->validate([
            'status'              => 'required|boolean',
            'actual_bottle_qty'   => Rule::when($request->status, ['required', 'integer']), // delivered
            'returned_bottle_qty' => Rule::when($request->status, ['required', 'integer']), // delivered
            'cash_received'       => Rule::when($request->status, ['required', 'integer']), // delivered
            'voucher_bottle_qty'  => Rule::when($request->status, ['required', 'integer']),
            'reason'              => Rule::when(!$request->status, ['required', 'integer']),  // un-delivered
            'longitude'           => 'required',
            'latitude'            => 'required',
            'remarks'             => 'nullable|string' // optional
        ]);

        try {
            DB::beginTransaction();

            // update schedule
            $detail->update([
                'status'              => $data['status'] ? CustomerScheduleStatus::Delivered : CustomerScheduleStatus::UnDelivered,
                'cash_received'       => $data['status'] ? $data['cash_received'] : null,
                'reason'              => !$data['status'] ? $data['reason'] : null,
                'remarks'             => $data['remarks'] ?? null,
                'longitude'           => $data['longitude'],
                'latitude'            => $data['latitude']
            ]);

            if($data['status']) {
                $detail->items()->where('product_id', 8)->latest()->first()->update([
                    'actual_bottle_qty'   => $data['status'] ? $data['actual_bottle_qty'] : null,
                    'returned_bottle_qty' => $data['status'] ? $data['returned_bottle_qty'] : null,
                ]);
            }


            // TODO: Check for notification action
            if ($detail->status == CustomerScheduleStatus::Delivered) {
                // TODO: Generate invoice
                $scheduleInvoiceService->create($detail, $request->voucher_bottle_qty);
            } else if ($detail->status == CustomerScheduleStatus::UnDelivered) {
                // TODO: Send not delivered notification
                Notification::send($detail->customerBranch, new OrderNotDeliveredNotification($detail));
            }


            DB::commit();
            return $this->sendResponse($detail, "Customer Delivery Order ". config('constants.schedule_delivery_statuses')[$detail->status] ." Successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th);
            return $this->sendError(
                'Something went wrong.', 
            [
                'message' => $th->getMessage(),
                'line'    => $th->getLine(),
                'code'    => $th->getCode()
            ]);
        }
    }


    public function reasons()
    {
        $reasons = AppSetting::values('OrderUndeliveredReasons');
        return $this->sendResponse(['reasons' => $reasons], null);
    }
    

    public function searchCustomer(Request $request)
    {
        if($request->ajax() || $request->wantsJson()) {
            $param = strtoupper($request->q);

            $customers = CustomerBranch::whereHas('customer', function ($customer) use ($request, $param) {
                                        return $customer->when(!empty(request('customer_type_id')), function ($query) use ($request) {
                                            return $query->where('customer_type_id', $request->customer_type_id);
                                        })
                                            ->where('status', 1);
                                    })
                                    ->where(function (Builder $builder) use ($param) {
                                        $builder->whereRaw('UPPER(address) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(street) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(building) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(branch_name) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(contact_person) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(contact_no) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(phone_office) LIKE ?', ['%' . $param . '%'])
                                            ->orWhereRaw('UPPER(email) LIKE ?', ['%' . $param . '%'])
                                            ->orWhere(function ($query) use ($param) {
                                                return $query->whereHas('customer', function ($q) use ($param) {
                                                    return $q->whereRaw('UPPER(name) LIKE ?', ['%' . $param . '%'])
                                                        ->orWhereRaw('UPPER(membership_no) LIKE ?', ['%' . $param . '%']);
                                                });
                                            })
                                            ->orWhere(function ($query) use ($param) {
                                                return $query->whereHas('block', function ($q) use ($param) {
                                                    return $q->whereRaw("UPPER(CONCAT(customer_branches.address,'-',name)) LIKE ?", ['%' . $param . '%']);
                                                });
                                            })
                                            ->orWhere(function ($query) use ($param) {
                                                return $query->whereHas('town', function ($q) use ($param) {
                                                    return $q->whereRaw("UPPER(name) LIKE ?", ['%' . $param . '%']);
                                                });
                                            });
                                    })
                                    ->with([
                                        'customer:id,customer_type_id,name,membership_no',
                                        'customer.customerType:id,name',
                                        'block:id,name',
                                        'town:id,name'
                                    ])
                                    ->whereIn('status', [1, 2])
                                    ->take(10)
                                    ->get()
                                    // ->sortBy('customer_name')
                                    ->toArray();
                
            return response()->json($customers); 
        }
    }



    public function saveCustomerCoordinates(Request $request, CustomerBranch $customerBranch)
    {
        $data = $request->validate([
            'longitude' => 'required',
            'latitude'  => 'required'
        ]);
        $customerBranch->update($data);

        return $this->sendResponse(['id' => $customerBranch->id], 'Coordinates updated successfully.');        
    }

    // public function getTowns()
    // {
    //     $towns = Town::active()->get(); 
    //     return response()->json($towns);
    // }
    public function getTowns()
    {
        $towns = Town::active()->get();
        return response()->json($towns);
    }
    public function getBlocks($town)
    {
        $blocks = Block::where('town_id',$town)->active()->get();
        return response()->json($blocks);
    } 
    
    public function getCustomer(Request $request)
    {
        $customerBranches = CustomerBranch::with([
                    'town:id,name',
                    'block:id,name',
                    'customer:id,name,customer_type_id,membership_no'
                ])
                ->leftJoin('towns as t', 't.id', '=', 'customer_branches.town_id')
                ->leftJoin('blocks as b', 'b.id', '=', 'customer_branches.block_id')
                ->where(function ($query) use ($request) {
                    return $query->whereRaw("IFNULL(customer_branches.delivery_source, IFNULL(b.delivery_source, t.delivery_source)) = ?", [(int) $request->delivery_source])
                                ->whereRaw('UPPER(IFNULL(customer_branches.delivery_schedule, IFNULL(b.delivery_schedule, t.DeliverySchedule))) LIKE ?', "%" . strtoupper($request->delivery_date) . "%");
                })
                ->where('customer_branches.status', 1)
                ->groupBy('customer_branches.id')
                ->select('customer_branches.*')
                ->get()
                ->append([
                    'delivery_source_name', 
                    'delivery_schedule_name',
                    'new_address',
                    'short_address',
                    'customer_name'
                ])
                ->sortBy([
                    ['town.name', 'asc'],
                    ['block.name', 'asc'],
                    ['short_address', 'asc'],
                ], SORT_NATURAL);
                


        return response()->json($customerBranches);
    }
    




    //  public function getBlockCustomer($block)
    // {
    //     $customer = Customer::where('block_id', $block)->get();
    //     return response()->json($customer);
    // }
    //    public function getStatusCustomer($block)
    // {
    //     $customer = Customer::where('status', $block)->get();
    //     return response()->json($customer);
    // }
    
    
}
