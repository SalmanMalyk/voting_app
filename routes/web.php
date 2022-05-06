<?php

use Illuminate\Support\Facades\Route;



// AUTHENTICATED ROUTES


Route::group(['middleware' => 'auth:sanctum'], function () {
	Route::view('/', 'client-app.welcome')->name('index');
});