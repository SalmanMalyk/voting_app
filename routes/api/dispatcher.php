<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Dispatcher\LoginController;
use App\Http\Controllers\Api\V1\Dispatcher\DispatcherController;


Route::group([
    'prefix'    => strtolower(config('app.api_version')) . '/dispatcher',
    'as'        => 'api.dispatcher.',
], function () {



    // * DISPATCHER LOGIN ROUTES
    Route::post('/login', [LoginController::class, 'authCheck'])->name('login');

    Route::post('/verify-auth-token', [LoginController::class, 'verifyAuthToken']);


    // TODO: initiate protected routes with role middleware
    Route::group(['middleware' => ['auth:sanctum']], function () {
        
        // * Dispatcher delivery schedules
        Route::get('/get-delivery-schedules', [DispatcherController::class, 'getDeliverySchedule']);

        Route::get('/get-delivery-schedule/{scheduleDelivery}/details', [DispatcherController::class, 'getDeliveryScheduleDetail']);

        // * Dispatch Schedule
        Route::post('/dispatch-delivery-schedules/{scheduleDelivery}', [DispatcherController::class, 'dispatchDeliverySchedule']);
        
        // * Complete Customer Order
        Route::post('/complete-delivery-order/{detail}', [DispatcherController::class, 'completeDeliveryOrder']);

        // * delivery cancel reasons
        Route::post('/reasons', [DispatcherController::class, 'reasons']);

        // find customer
        Route::get('/search-customers', [DispatcherController::class, 'searchCustomer']);

        Route::post('/save-customer-coordinates/{customerBranch}', [DispatcherController::class, 'saveCustomerCoordinates']);

        Route::get('/get-town', [DispatcherController::class, 'getTowns']);

        Route::get('/get-block/{town}', [DispatcherController::class, 'getBlocks']);


        Route::post('/get-customer', [DispatcherController::class, 'getCustomer']);

        
    });

    // Route::get('/get-block-customer/{block}', [DispatcherController::class, 'getBlockCustomer']);
    // Route::get('/get-status-customer/{status}', [DispatcherController::class, 'getStatusCustomer']); 
});
