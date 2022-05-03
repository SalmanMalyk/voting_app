<?php

namespace App\Http\Controllers\Api\V1\Invoice;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Module\Invoice\Invoice;
use App\Models\Module\Customer\CustomerBranch;

class InvoiceController extends Controller
{
    public function userAssignedInvoices(Request $request) : Collection
    {
        if($request->ajax() || $request->wantsJson()) {
            $request->validate([
                'status' => 'required|array|min:1'
            ]);

            try {
                DB::beginTransaction();
                
                $invoices = Invoice::where('dispatcher', auth()->id())
                                    ->with(['customerBranch:id,customer_id,address,town_name,contact_no,latitude,longitude', 'customerBranch.customer:id,name'])
                                    ->whereDate('dispatch_date', Carbon::now()->endOfDay())
                                    ->whereIn('status', $request->status)
                                    ->get()
                                    ->map(function($item) {
                                        return [
                                            'id' => $item->id,
                                            'invoice_no' => $item->invoice_no,
                                            'customer_name' => $item->customerBranch->customer->name ?? 'N/A',
                                            'address' => ($item->customerBranch->address ?? 'N/A'),
                                            'town_name' => ($item->customerBranch->town_name ?? 'N/A'),
                                            'contact_no' => $item->customerBranch->contact_no ?? 'N/A',
                                            'assignment_date' => [
                                                'date' => Carbon::parse($item->assignment_date)->format('d-M-Y'),
                                                'time' => Carbon::parse($item->assignment_date)->format('h:i A'),
                                            ],
                                            'dispatch_date' => [
                                                'date' => Carbon::parse($item->dispatch_date)->format('d-M-Y'),
                                                'time' => Carbon::parse($item->dispatch_date)->format('h:i A'),
                                            ],
                                            'status' => $item->status,
                                            'total' => (int) $item->sum_invoice_amount > 0 ? number_format($item->sum_invoice_amount) : null,
                                            'payment_type' => [
                                                'id'    => $item->payment_type_id,
                                                'title' => config('constants.delivery_payment_status')[$item->payment_type_id] ?? null,
                                                'color' => $item->payment_type_id == 0 ? '#3498db' : ($item->payment_type_id == 1 ? '#e74c3c' : ($item->delivery_statuses == 2 ? '#27ae60' : null))
                                            ],
                                            'coordinates' => [
                                                'latitude' => $item->customerBranch->latitude ?? null,
                                                'longitude' => $item->customerBranch->longitude ?? null
                                            ]
                                        ];
                                    });
                DB::commit();
                return $invoices;
            } catch (\Throwable $th) {
                return response()->json(['message' => $th->getMessage()], 500);
            }
        }
    }




    public function invoiceDetails(Request $request, Invoice $invoice) : Collection
    {
        if($request->ajax() || $request->wantsJson()) {
            try {
                $invoice = $invoice->load(['entries', 'entries.product:id,name']);
                if(count($invoice->entries) > 0) {
                    $responseData = collect([
                        'invoice_total' => $invoice->sum_invoice_amount,
                        'entries' => collect($invoice->entries)->map(function($item) {
                            return [
                                'description' => $item->product->name ?? 'N/A',
                                'quantity'    => $item->quantity,
                                'amount'      => $item->amount,
                            ];
                        })
                    ]);
                    return $responseData;
                } else {
                    return collect(['message' => 'No Entries Found']);
                }

            } catch (\Throwable $th) {
                return response()->json(['message' => $th->getMessage()], 500);
            }
        }
    }




    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'status' => 'required|integer',
            'amount' => Rule::when($request->status == 2, ['required', 'integer']),
            'bottle_returned' => Rule::when($request->status == 2, ['required', 'integer']),
        ]);

        // update invoice
        try {
            DB::beginTransaction();
            
            $invoice->update([
                'status'          => $request->status, // order is complete
                'bottle_returned' => $request->status == 2 ? $request->bottle_returned : null,
                'cash_received'   => $request->status == 2 ? $request->amount : null,
                'delivery_date'   => $request->status == 2 ? Carbon::now('PKT') : null,
                'updated_by'      => auth()->id(),
                'reason'          => $request->remarks ?? null
            ]);

            if($request->exists('lng') && $request->exists('lat')) {
                $invoice->customerBranch()->update([
                    'latitude' => $request->lat,
                    'longitude' => $request->lng
                ]);
            }
            
            
            DB::commit();

            return collect([
                'message' => 'Invoice updated successfully!',
                'data' => $invoice
            ]);

        } catch (\Throwable $th) {
            DB::rollback();
            return($th);

            return collect([
                'message' => $th->getMessage(),
                'code' => $th->getCode()
            ]);
        }
    }
 


    public function getInvoiceDetails(Request $request, Invoice $invoice)
    {
        return response()->json($invoice, 200);
    }


    public function updateInvoiceDetails(Request $request, Invoice $invoice)
    {
        $invoice->update($request->all());
        return response()->json($invoice, 200);
    }


    public function existingInvoice(Request $request, CustomerBranch $customerBranch)
    {
        $invoice = $customerBranch->invoices()->whereIn('status', [0, 1])->orderBy('order_date', 'desc')->first();

        if(!empty($invoice)) {
            $date = Carbon::parse($invoice->order_date)->format('d-M-Y');
            return response()->json([
                'message' => "There's already a pending invoice <small class='font-w700 text-primary'>($invoice->invoice_no)</small> dated <small class='font-w700 text-primary'>($date)</small>. <br>Are you sure to create a new invoice?",
                'success' => false
            ], 200);
        } else {
            return response()->json([
                'message' => null,
                'success' => true
            ], 200);
        }

    }
    
    
}
