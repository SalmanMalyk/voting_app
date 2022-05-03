<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\General\Audit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Invoice\Invoice;
use App\Models\Module\Invoice\InvoiceEntry;

class RestoreInvoiceEntryCreateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $audits = Audit::whereBetween('created_at', [Carbon::parse('2021-10-02')->startOfDay(), Carbon::parse('2021-10-06')->endOfDay()])
                        ->where('auditable_type', 'LIKE', '%InvoiceEntry')
                        ->where('event', 'created')
                        ->get();

        try {
            DB::beginTransaction();

            foreach ($audits as $key => $audit) {
                $invoice = Invoice::where('temp_id', $audit['new_values']['invoice_id'] ?? null)->first();

                if($invoice) {
                    InvoiceEntry::create([
                        'product_id'      => $audit['new_values']['product_id'] ?? null,
                        'brand_id'        => $audit['new_values']['brand_id'] ?? null,
                        'product_price'   => $audit['new_values']['product_price'] ?? null,
                        'discount_amount' => $audit['new_values']['discount_amount'] ?? null,
                        'quantity'        => $audit['new_values']['quantity'] ?? null,
                        'amount'          => $audit['new_values']['amount'] ?? null,
                        'invoice_id'      => $invoice->id ?? null,
                        'temp_id'         => $invoice->temp_id ?? null
                    ]);
                } else {
                    info($audit['new_values']['invoice_id'] ?? null);
                }
            }   
            
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            dd($th);
        }
    }
}
