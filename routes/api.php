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

	Route::get('/getRoleName', [DataController::class, 'getRoleName'])->name('getRoleName');

});





Route::fallback(function () {
	return response()->json([
		'message' => 'Page Not Found. If error persists, contact contact@erie.pk'
	], 404);
});
