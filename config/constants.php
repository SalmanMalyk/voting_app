<?php 

use App\Models\Module\Product\Product;

	return [

		'permissions' => [
			'0' => 'list',
			'1' => 'create',
			'2' => 'show',
			'3' => 'edit',
			'4' => 'delete',
		],

		'customer_branch_statuses' => [
			'0' => 'Left',
			'1' => 'Active',
			'2' => 'In-Active'
		],

		'religion_ids' => [
			'0' => 'Islam',
		],

		'gender_ids' => [
			'0' => 'Male',
			'1' => 'Female',
		],

		'marital_status_id' => [
			'0' => 'Single',
			'1' => 'Married',
			'2' => 'Divorced',
		],

		'blood_group_id' => [
			'0' => 'A+',
			'1' => 'A-',
			'2' => 'B+',
		],

		'job_status' => [
			'0' => 'Working'
		],

		'customer_branch_payment_id' => [
			0 => 'Cash',
			1 => 'Credit'
		],

		'customer_types' => [
			'0' => 'Walk-In',
			'1' => 'Corporate',
		],

		'workflow_methods' => [
			'0' => 'index',
			'1' => 'create',
			'2' => 'store',
			'3' => 'show',
			'4' => 'edit',
			'5' => 'update',
			'6' => 'destroy',
		],


		'approval_by_status' => [
			'0' => 'Any',
			'1' => 'All'
		],


		'product_categories' => [
		    '0' => 'Refill(19L)',
		    '1' => 'Sale',
			'6' => 'Exchange',
			'5' => 'Accessories',
		    '2' => '500 ml',
			'3' => '1.5L',
			'4' => '6L',
			'7' => 'Consumable'
		],

		'invoice_types' => [
			'0' => 'Shop',
			'1' => 'Order'
		],

		'delivery_statuses' => [
			'0' => 'Pending',
			'1' => 'Out for Delivery',
			'2' => 'Delivered',
			'3' => 'Canceled',
			'4' => 'Deleted'
		],

		'payment_methods' => [
			'0' => 'Cash',
			'1' => 'Cheque',
			'2' => 'Online Transfer',
			// '3' => 'DD',
			// '4' => 'Pay Order',
			'5' => 'Tax'
		],

		'delivery_payment_status' => [
			'0' => 'Cash on Delivery', 
			'1' => 'Credit', 
			'2' => 'Cash'
		],

		'other_brand_bottles' => [
			'0' => 'Nestle',
			'1' => 'Aquafina',
			'2' => 'Kinley',
			'3' => 'Sufi',
			'4' => 'Springly',
			'5' => 'Gourmet',
			'6' => 'Doce',
			'7' => 'Malmo',
			'8' => 'Butt',
			'9' => 'Ocean',
			'10' => 'Naya',
			'11' => 'Jami',
			'12' => 'Doctor',
			'13' => 'Bliss',
			'14' => 'Others',
			'15' => 'Aabekhob',
			'16' => 'Classic',
			'17' => 'Aquaoz',
			'18' => 'Oasis',
			'19' => 'Sparkle',
			'20' => 'Ramsa',
			'21' => 'Lifeway',
			'22' => 'Mazco',
			'23' => 'Aaberahat',
			'24' => 'Oxygner',
			'25' => 'H2olife',
			'26' => 'Krisco',
		],

		'delivery_sources' => [
			'1' => 'Shop',
			'2' => 'Factory' 
		],

		'week_days' => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'No Delivery', 'On Call'],

		'account_status'=>[
			'1'=>'Select Account Status',
			'2'=>'Close Permanently',
			'3'=>'Close Temporarily',
			'4'=>'Active',
		],

		'reason'=>[
			'1'=>'Select Reason For Bottle Return',
			'2'=>'High Prices',
			'3'=>'Bad Service Quality',
			'4'=>'Moving To Another Location',
		],

		'schedule_statuses' => [
			'0' => 'Pending',
			'1' => 'Submitted',
			'2' => 'Approved',
			'3' => 'Rejected',
			'4' => 'Dispatched',
			'5' => 'Removed',
			'6' => 'Canceled',
			'7' => 'Completed',
			'8' => 'Finished',
		],
		
		'schedule_delivery_statuses' => [
			'0' => 'Pending',
			'1' => 'Removed',
			'2' => 'Added',
			'3' => 'Re-sorted',
			'4' => 'Delivered',
			'5' => 'Un-Delivered',
		],

		'delivery_variance' => [
			0 => [
				'title' => 'Less',
				'symbol' => '<'
			],
			1 => [
				'title' => 'Not-Delivered',
				'symbol' => ''
			],
			2 => [
				'title' => 'Extra',
				'symbol' => '>'
			],
			3 => [
				'title' => 'Equal',
				'symbol' => '='
			],

			4 => [
				'title' => 'All',
				'symbol' => null
			]
			
		]
	];