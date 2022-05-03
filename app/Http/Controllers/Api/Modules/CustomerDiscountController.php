<?php

namespace App\Http\Controllers\Api\Modules;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\Module\Customer\Customer;
use App\Models\Module\Customer\CustomerBranch;
use App\Models\Module\Customer\CustomerDiscount;
use App\Repository\Eloquent\CustomerBranchRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CustomerDiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
  
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

        $customers= Customer::where(function(Builder $builder) use ($param) {
                                        $builder->orWhere(function($query) use ($param){
                                                    return $query->whereRaw('UPPER(name) LIKE ?',['%'.$param.'%'])
                                                                 ->orWhereRaw('UPPER(membership_no) LIKE ?',['%'.$param.'%']);
                                                });
                                    })
                                    ->where('status',true)
                                    ->take(10)
                                    ->get()
                                    ->sortBy('name')
                                    ->map(function ($item) {
                                        return [
                                            'id' => $item->id,
                                            'title' => $item->name ?? '—',
                                            'text' => '<b>'.($item->name ?? '—').'</b>',
                                            'html' => '
                                                <div class="customer_dropdown">
                                                    <strong class="customer_name">'.($item->name ?? '—').'</strong>
                                                    <p class="meta">
                                                    <strong>Membership #:</strong> '.($item->membership_no ?? '—').'
                                                    </p>
                                                </div>
                                            '
                                        ];
                                    });
    return response()->json($customers);   
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      // 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
