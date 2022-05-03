<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Module\Product\ProductCatagory;

class ImportProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductCatagory::query()->truncate();

        $categories = [
		    '0' => 'Refill(19L)',
		    '1' => 'Sale',
			'6' => 'Exchange',
			'5' => 'Accessories',
		    '2' => '500 ml',
			'3' => '1.5L',
			'4' => '6L',
			'7' => 'Consumable',
            '8' => 'Gift Voucher'
		];

        foreach ($categories as $key => $category) {
            ProductCatagory::create([
                'user_id'    => 17,
                'title'      => $category,
                'visibility' => true,
                'status'     => true
            ]);
        }
    }
}
