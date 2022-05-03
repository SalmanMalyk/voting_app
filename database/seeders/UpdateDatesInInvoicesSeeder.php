<?php

namespace Database\Seeders;

use App\Models\Master\Town;
use App\Models\Master\Block;
use App\Models\Module\Customer\CustomerBranch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Invoice\Invoice;

class UpdateDatesInInvoicesSeeder extends Seeder
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

        
            ini_set('memory_limit', '-1');

            // $invoices = DB::table('erie_invoices')->get();

            // foreach($invoices as $key => $invoice) {
            //     if($invoice->date_added != '0000-00-00 00:00:00') {
            //         Invoice::where('id', $invoice->ID)
            //                 ->update([
            //                     'created_at' => $invoice->date_added ?? null
            //                 ]);
            //     }
            // }

            /**
             * 
             $entries = DB::table('erie_invoices_entries')
                            ->where('itemQtyReceived', '>', 0)
                            ->select('invoice_id', 'itemQtyReceived')
                            ->get();
                        
            foreach($entries as $entry) {
                Invoice::find($entry->invoice_id)
                        ->update([
                            'bottle_returned' => $entry->itemQtyReceived
                        ]);
            */



            // $json = json_decode(file_get_contents(asset('blocks.json')), true); 

            // foreach ($json as $key => $block) {
            //     Block::create([
            //         'id'        => $block['block_id'],
            //         'town_id'   => $block['town_id'],
            //         'name'      => $block['block_name'],
            //         'status'    => true,
            //     ]);
            // }

            // $json = json_decode(file_get_contents(asset('updated_branches.json')), true);  
            
            // foreach ($json as $key => $data) {
            //     if($data['town_name']) {
            //         $town = Town::whereRaw('UPPER(name) = ?', [strtoupper($data['town_name'])])->first();
            //         if($town) {
            //             if(!empty($data['block_name'])) {
            //                 $block = $town->blocks()->whereRaw('UPPER(name) = ?', [strtoupper($data['block_name'])])->first();
            //                 if ($block) {
            //                     $customerBranch = CustomerBranch::find($data['branch_id'])->update([
            //                         'block_id' => $block->id
            //                     ]);
            //                     info('Updated Customer: '. $customerBranch);
            //                 } else {
            //                     info('----------- NOT FOUND BLOCK: ('. $data['block_name'].' --|-- ' .$data['town_name'] .' = ' . $town->id .') ---------------');
            //                 }
            //             }
            //         } else {
            //             info('----------- NOT FOUND TOWN: ('. $data['town_name'].') ---------------');
            //         }
            //     }
            // }

            $json = json_decode(file_get_contents(asset('customers_address.json')), true); 
            $count = 0;
            foreach ($json as $key => $data) {
                $customer =  CustomerBranch::withTrashed()->find(str_replace(" ", "", $data['id']));
                if($customer) {
                    $customer->update([
                        'address'  => $data['address'] ?? null,
                        'street'   => $data['street'] ?? null,
                        'building' => $data['building'] ?? null,
                    ]);
                    $count++;
                } else {
                    info('NOT FOUND: ' . $data['id']);
                }
            }

            info("Updated {$count} results.");

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            dd($th);
        }
    }
}
