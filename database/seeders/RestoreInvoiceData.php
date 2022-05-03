<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\General\Audit;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Invoice\Invoice;

class RestoreInvoiceData extends Seeder
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
                        ->where('event', 'created')
                        ->pluck('new_values')
                        ->toArray();
        

        try {
            DB::beginTransaction();

            foreach ($audits as $audit) {
                $customerBranch = CustomerBranch::find($audit['customer_branch_id']);
                if($customerBranch && is_null($customerBranch->invoices()->whereDate('order_date', $audit['order_date'])->where('customer_branch_id', $customerBranch->id)->first())) {
                    Invoice::create([
                        'customer_branch_id'  => $customerBranch->id ?? null,
                        'membership_no'       => $customerBranch->customer->membership_no ?? null,
                        'erie_branch_id'      => 1 ?? null,
                        'order_taken_by'      => $audit['order_taken_by'] ?? null,
                        'invoice_type_id'     => $audit['invoice_type_id'] ?? null,
                        'customer_type_id'    => $audit['customer_type_id'] ?? null,
                        'invoice_no'          => $this->generateInvoiceCode(),
                        'sum_invoice_amount'  => $audit['sum_invoice_amount'] ?? null,
                        'cash_received'       => $audit['cash_received'] ?? null,
                        'change_return'       => $audit['change_return'] ?? null,
                        'sale_tax_percentage' => $audit['sale_tax_percentage'] ?? null,
                        'payment_type_id'     => $audit['payment_type_id'] ?? null,
                        'schedule_datetime'   => $audit['schedule_datetime'] ?? null,
                        'assignment_date'     => $audit['assignment_date'] ?? null,
                        'dispatcher'          => $audit['dispatcher'] ?? null,
                        'dispatch_date'       => $audit['dispatch_date'] ?? null,
                        'delivery_date'       => $audit['delivery_date'] ?? null,
                        'bottle_returned'     => $audit['bottle_returned'] ?? null,
                        'order_date'          => $audit['order_date'] ?? null,
                        'status'              => $audit['invoice_type_id'] == 1 ? 2 : ($audit['status'] ?? null),
                        'reason'              => $audit['reason'] ?? null,
                        'updated_by'          => $audit['updated_by'] ?? null,
                        'temp_id'             => $audit['id'] ?? null
                    ]);
                } else {
                    info($audit['customer_branch_id']);
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
        }
    }

    protected function generateInvoiceCode()
    {
        $number = 0;

        $invoiceCount = Invoice::count();
        if (!$invoiceCount) {
            $number = 0;
        } else {
            $number = $invoiceCount;
        }
        $invoiceNo = date('y') . 'i' . sprintf('%05d', intval($number) + 1);

        return $invoiceNo;
    }
}
