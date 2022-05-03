<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\Modules\CustomerController;
use App\Http\Controllers\Api\V1\Invoice\InvoiceController;
use App\Http\Controllers\Api\Modules\CustomerDiscountController;
use App\Http\Controllers\Api\V1\Customers\RequestController;
use App\Http\Controllers\Module\InvoiceController as WebInvoiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group([
	'prefix'    => strtolower(config('app.api_version')),
	'as'	    => 'api.',
], function () {

	Route::middleware('auth:sanctum')->group(function () {		
		

		// INVOICE API ROUTES
		Route::group(['prefix' => 'invoices', 'as' => 'invoices'], function () {
			// GET USER ASSIGNED INVOICES FOR CURRENT DATE
			Route::post('/userAssignedInvoices', [InvoiceController::class, 'userAssignedInvoices']);

			// GET INVOICE DETAILS 
			Route::post('/{invoice}/invoiceDetails', [InvoiceController::class, 'invoiceDetails']);

			// invoice print view
			Route::post('/{invoice}/printDeliveryInvoice', [WebInvoiceController::class, 'printDeliveryInvoice']);

			// update invoice according to status
			Route::patch('/{invoice}/update', [InvoiceController::class, 'update']);
		});
	});
});



Route::group(['as' => 'api.'], function () {	
	Route::get('/get-customersdiscount-list', [CustomerDiscountController::class, 'index'])->name('customersdiscount.index');

	Route::get('/get-customers-list', [CustomerController::class, 'index'])->name('customers.index');

	Route::get('/get-users-by-param', [DataController::class, 'getUsersByParam'])->name('getUsersByParam');

	Route::get('/get-users-by-role', [DataController::class, 'getUserByRole'])->name('getUserByRole');

	Route::get('/getAllUsersList', [DataController::class, 'getAllUsersList'])->name('getAllUsersList');


	Route::get('/getCustomerTypes', [DataController::class, 'getCustomerTypes'])->name('getCustomerTypes');

	Route::get('/getMembershipTypes', [DataController::class, 'getMembershipTypes'])->name('getMembershipTypes');

	Route::get('/getTowns', [DataController::class, 'getTowns'])->name('getTowns');

	Route::get('/getTownBlocks', [DataController::class, 'getTownBlocks'])->name('getTownBlocks');

	Route::get('/getAllProducts', [DataController::class, 'getAllProducts'])->name('getAllProducts');

	Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');

	Route::get('/getTownByNullZone', [DataController::class, 'getTownByNullZone'])->name('getTownByNullZone');

	Route::get('/zones/list', [DataController::class, 'getAllZones'])->name('zones.index');
   
	Route::get('/customer-ledger-info/{branch}', [CustomerController::class, 'customerLedgerInfo'])->name('customers.customerLedgerInfo');
	
	Route::get('/{invoice}/get-invoice-details', [InvoiceController::class, 'getInvoiceDetails'])->name('invoices.getInvoiceDetails');

	Route::post('/{invoice}/update-invoice-details', [InvoiceController::class, 'updateInvoiceDetails'])->name('invoices.updateInvoiceDetails');

	// Search street / building names
	Route::get('/search-street-building', [DataController::class, 'searchThroughAddress'])->name('searchThroughAddress');

	Route::get('/{customerBranch}/existing-invoice', [InvoiceController::class, 'existingInvoice'])->name('invoices.existingInvoice');

	// get avaiable vehicles
	Route::get('/getScheduleVehicles', [DataController::class, 'getScheduleVehicles'])->name('getScheduleVehicles');
	// get vehicle info
	Route::get('/{vehicle}/getVehicleInfo', [DataController::class, 'getVehicleInfo'])->name('getVehicleInfo');
	
	// * get specific schedule info 
	Route::get('/{scheduleDelivery}/getDeliveryScheduleInfo', [DataController::class, 'getDeliveryScheduleInfo'])->name('getDeliveryScheduleInfo');

	// * get payment types
	Route::get('/getPaymentTypes', [DataController::class, 'getPaymentTypes'])->name('getPaymentTypes');
});





Route::fallback(function () {
	return response()->json([
		'message' => 'Page Not Found. If error persists, contact contact@erie.pk'
	], 404);
});
