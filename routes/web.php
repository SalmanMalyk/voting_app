<?php

use App\Http\Controllers\Analytics\DashboardReportController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\General\MilestoneController;
use App\Http\Controllers\General\ParameterController;
use App\Http\Controllers\Module\UserController;
use Illuminate\Support\Facades\Route;




Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::view('/', 'client-app.welcome')->name('index');
});