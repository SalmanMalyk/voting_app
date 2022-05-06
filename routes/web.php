<?php

use App\Http\Controllers\Analytics\DashboardReportController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\General\MilestoneController;
use App\Http\Controllers\General\ParameterController;
use App\Http\Controllers\Module\UserController;
use Illuminate\Support\Facades\Route;


// AUTHENTICATED ROUTES
Route::group(['middleware' => 'auth:sanctum', 'as' => 'dashboard.'], function () {
	// SYSTEM ROUTES
	Route::get('/', [AppController::class, 'index'])->name('index');

	Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

	Route::post('/audits', [AppController::class, 'getModelAudits'])->name('getModelAudits');

	Route::post('/update-user-password', [AppController::class, 'updatePassowrd'])->name('password.update');

	Route::post('/fetch-notifications', [AppController::class, 'fetchNotifications'])->name('fetch-notifications');

	// NOTIFICATIONS ROUTES
	Route::get('/markAsRead', function () {
		auth()->user()->unreadNotifications->markAsRead();
		return response()->noContent();
	});

	/* --------------- MODULES -------------------- */

	/* --------------- USERS -------------------- */
	Route::get('/users/admin', [UserController::class, 'adminUser'])->name('users.adminUser');
	Route::patch('/users/update-status', [UserController::class, 'updateStatus'])->name('users.updateStatus');
	Route::resource('users', UserController::class);

	/* --------------- GENERAL ROUTES -------------------- */
	Route::group(['prefix' => 'general-configuration', 'as' => 'config.', 'title' => 'General Configurations', 'namespace' => 'App\Http\Controllers\General'], function () {

		/* --------------- MENU BUILDER -------------------- */
		Route::view('menu-builder', 'general_config.menu_builder.index')->name('menu_builder');

		/* --------------- Roles -------------------- */
		Route::resource('roles', RoleController::class);

		/* --------------- Permissions -------------------- */
		Route::resource('permissions', PermissionController::class);
	});

	/* --------------- Milestone -------------------- */
	Route::resource('milestone', MilestoneController::class);

	/* --------------- Terms And Conditions -------------------- */
	Route::get('/terms-and-conditions', [ParameterController::class, 'termsAndConditions'])->name('termsAndConditions');
	Route::post('/update-terms-and-conditions', [ParameterController::class, 'updatetermsAndConditions'])->name('updatetermsAndConditions');
	
	/* --------------- Privacy Policy -------------------- */
	Route::get('/privacy-policy', [ParameterController::class, 'privacyPolicy'])->name('privacyPolicy');
	Route::post('/update-privacy-policy', [ParameterController::class, 'updatePrivacyPolicy'])->name('updatePrivacyPolicy');

	/* --------------- Master ROUTES -------------------- */
	Route::group(['prefix' => 'administrator', 'as' => 'administrator.', 'title' => 'Administrator', 'namespace' => 'App\Http\Controllers\Administrator'], function () {
		Route::resource('authentication-logs', AuthenticationLogController::class);
	});
});