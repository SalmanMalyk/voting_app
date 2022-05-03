<?php

namespace App\Http\Controllers\Api\Modules;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Api\BaseController;
use App\Models\Module\Customer\CustomerBranch;
use App\Repository\Eloquent\CustomerBranchRepository;

class CustomerController extends BaseController
{
    public $customerBranchRepository;

    public function __construct(CustomerBranchRepository $customerBranchRepository)
    {
        $this->customerBranchRepository = $customerBranchRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = strtoupper($request->q);

        $customers = CustomerBranch::with([
                                        'customer:id,customer_type_id,name,membership_no',
                                        'customer.customerType:id,name',
                                        'block:id,name'
                                    ])
                                    ->whereHas('customer', function ($customer) use ($request, $param) {
                                        return $customer->when(!empty(request('customer_type_id')), function ($query) use ($request) {
                                                    return $query->where('customer_type_id', $request->customer_type_id);
                                                })
                                                ->where('status', 1);
                                    })
                                    ->where(function(Builder $builder) use ($param) {
                                        $builder->whereRaw('UPPER(address) LIKE ?', ['%' . $param . '%'])
                                                ->orWhereRaw('UPPER(street) LIKE ?', ['%' . $param . '%'])
                                                ->orWhereRaw('UPPER(building) LIKE ?', ['%' . $param . '%'])
                                                ->orWhereRaw('UPPER(branch_name) LIKE ?', ['%' . $param . '%'])
                                                ->orWhereRaw('UPPER(contact_person) LIKE ?',['%'.$param.'%'])
                                                ->orWhereRaw('UPPER(contact_no) LIKE ?',['%'.$param.'%'])
                                                ->orWhereRaw('UPPER(phone_office) LIKE ?',['%'.$param.'%'])
                                                ->orWhereRaw('UPPER(email) LIKE ?',['%'.$param.'%'])
                                                ->orWhere(function($query) use ($param){
                                                    return $query->whereHas('customer', function ($q) use ($param) {
                                                        return $q->whereRaw('UPPER(name) LIKE ?',['%'.$param.'%'])
                                                                 ->orWhereRaw('UPPER(membership_no) LIKE ?',['%'.$param.'%']);
                                                    });
                                                })
                                                ->orWhere(function($query) use ($param){
                                                    return $query->whereHas('block', function ($q) use ($param) {
                                                        return $q->whereRaw("UPPER(CONCAT(customer_branches.address,'-',name)) LIKE ?",['%'.$param.'%']);
                                                    });
                                                })
                                                ->orWhere(function($query) use ($param){
                                                    return $query->whereHas('town', function ($q) use ($param) {
                                                        return $q->whereRaw("UPPER(name) LIKE ?",['%'.$param.'%']);
                                                    });
                                                });
                                                
                                    })
                                    ->when($request->schedule, function(Builder $builder, $schedule) {
                                        $schedule = json_decode($schedule, true);
                                        return $builder
                                                ->leftJoin('towns as t', 't.id', '=', 'customer_branches.town_id')
                                                ->leftJoin('blocks as b', 'b.id', '=', 'customer_branches.block_id')
                                                ->where(function ($query) use ($schedule) {
                                                    $day = Carbon::parse($schedule['schedule'])->format('l');
                                                    return $query->whereRelation('scheduleDeliveryDetails', 'schedule_delivery_id', '!=', $schedule['id'])
                                                                ->whereRaw("IFNULL(customer_branches.delivery_source, IFNULL(b.delivery_source, t.delivery_source)) = ?", [(int) $schedule['source']])
                                                                ->whereRaw('UPPER(IFNULL(customer_branches.delivery_schedule, IFNULL(b.delivery_schedule, t.DeliverySchedule))) LIKE ?', "%" . strtoupper($day) . "%");
                                                });
                                    })
                                    ->when($request->rmb, function(Builder $query, array $rmb) {
                                        return $query->whereIn('customer_branches.status', $rmb);
                                    }, function(Builder $query) {
                                        return $query->whereIn('customer_branches.status', [1, 2]);
                                    })
                                    ->select('customer_branches.*')
                                    ->take(10)
                                    ->get()
                                    ->sortBy('customer_name')
                                    ->map(function ($item) {
                                        return [
                                            'id' => $item->id,
                                            'title' => $item->customer->customer_type_id == 2 ? $item->contact_person : ($item->customer->name ?? '—'),
                                            'text' => '<b>'.($item->customer->customer_type_id == 2 ? $item->contact_person : ($item->customer->name ?? '—')) . ($item->customer->customerBranches()->count() > 1 ? ('</b> <small class="customer_branch">('.($item->branch_name ?? '—').')</small>') : null),
                                            'html' => '
                                                <div class="customer_dropdown">
                                                    <span class="customer_type">('.($item->customer->customerType->name ?? '—').')</span>
                                                    <strong class="customer_name">'.($item->customer->customer_type_id == 2 ? $item->contact_person : ($item->customer->name ?? '—')).'</strong>'
                                                    .($item->customer->customerBranches()->count() > 1 ? '<small class="customer_branch">(' . ($item->branch_name ?? '—') . ')</small>' : null).
                                                    '<p class="meta">
                                                        <strong>Phone:</strong> '.($item->contact_no ?? '—').' / <strong>Membership #:</strong> '.($item->customer->membership_no ?? '—').'
                                                    </p>
                                                    <p> '.($item->new_address ?? '—').', '.($item->town->name ?? '—'). ', '.($item->city ?? '—').'</p>
                                                </div>
                                            '
                                        ];
                                    });
            return response()->json($customers);   
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($customer)
    {
        $customer = $this->customerBranchRepository->findById($customer, ['*'], 
            [
                'customer:id,customer_type_id,membership_no,name,special_customer',
                'town:id,zone_id,name,status,delivery_source,DeliverySchedule',
                'block:id,town_id,name,status,delivery_source,delivery_schedule', 
                'town.zone:id,name'
            ], 
            [
                'arrear', 
                'delivery_source_name', 
                'new_address', 
                'delivery_schedule_name',
                'earned_bottle_count',
                'last_delivered_bottle'
            ]);
        return response()->json($customer, 200);
    }


    public function customerLedgerInfo(CustomerBranch $branch)
    {        
        $branch->load([
            'town:id,name',
            'invoices'
        ]);

        return collect([
            'first_delivery'   => $branch->invoices()->status(2)->whereNotNull('delivery_date')->orderBy('delivery_date', 'asc')->limit(1)->first()->delivery_date ?? null,
            'last_delivery'    => $branch->invoices()->status(2)->whereNotNull('delivery_date')->orderBy('delivery_date', 'desc')->limit(1)->first()->delivery_date ?? null,
            'bottle_cap'       => number_format($branch->bottle_cap),
            'bottle_balance'   => 'N/A',
            'receivable'       => number_format($branch->sum_sale - $branch->sum_receipts),
            'last_paid_amount' => $branch->last_paid_amount ? number_format($branch->last_paid_amount) : null,
            'sum_sale'         => $branch->sum_sale ? number_format($branch->sum_sale) : null,
            'town'             => $branch->town->name,
            'new_address'      => $branch->new_address,
            'schedule_delivery'=> $branch->schedule_delivery,
            // 'sum_receipts'     => $branch->sum_receipts ? number_format($branch->sum_receipts) : null,
            'sum_receipts'     => $branch->arrear ? number_format($branch->arrear) : null,
            'complete_name'    => $branch->complete_name,
            'last_paid_date'   => !empty($branch->last_paid_date) ? Carbon::parse($branch->last_paid_date)->format('d-M-Y') : null,
            'membership_no'    => $branch->customer->membership_no
        ]);
    }
    
}