<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Customer\LoginController;
use App\Http\Controllers\Api\V1\Customers\RequestController;


Route::group([
    'prefix'    => strtolower(config('app.api_version')) . '/customer',
    'as'        => 'api.customer.',
], function () {



    // * DISPATCHER LOGIN ROUTES
    Route::post('/send-otp', [LoginController::class, 'sendOtp']);

    Route::post('/verify-otp-auth', [LoginController::class, 'verifyOtpAuth']);

    // TODO: initiate protected routes with role middleware
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::get('/recent-orders', [RequestController::class, 'getLatestOrders']);
    });
});
