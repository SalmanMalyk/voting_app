<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\General\Audit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestoreInvoiceUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $audits = Audit::whereBetween('created_at', [Carbon::parse('2021-10-02')->startOfDay(), Carbon::parse('2021-10-06')->endOfDay()])
                        ->where('auditable_type', 'LIKE', '%Invoice')
                        ->where('event', 'updated')
                        ->with('invoice')
                        ->get();
        
        
        try {
            DB::beginTransaction();

            foreach ($audits as $key => $audit) {
                $audit->invoice()->update([
                    'cash_received'     => $audit['new_values']['cash_received'] ?? null,
                    'delivery_date'     => $audit['new_values']['delivery_date'] ?? null,
                    'bottle_returned'   => $audit['new_values']['bottle_returned'] ?? null,
                    'status'            => $audit['new_values']['status'] ?? null,
                    'updated_by'        => $audit['user_id']
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
