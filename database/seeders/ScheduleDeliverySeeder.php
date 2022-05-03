<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Customer\CustomerBranch;

class ScheduleDeliverySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            DB::beginTransaction();

            $customerBranches = CustomerBranch::whereIn('status', [1, 2])->get();

            // TODO: Loop through all customers and fetch last five invoices to calculate schedule delivery
            foreach ($customerBranches as $customerBranch) {
                $total_quantity = $customerBranch->invoices()
                    ->where('status', 2)
                    ->orderBy('delivery_date', 'desc')
                    ->with('entries:invoice_id,quantity')
                    ->whereHas('entries', function ($query) {
                        return $query->whereIn('product_id', [7, 8, 11]);
                    })
                    ->limit(5)
                    ->select()
                    ->get()
                    ->reduce(function ($carry, $invoice) {
                        return $carry + $invoice->entries->sum('quantity');
                    }, 0);

                $customerBranch->update([
                    'schedule_delivery' => round($total_quantity / 5)
                ]);
            }
            
            
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();

            dd($th);
        }
    }
}
