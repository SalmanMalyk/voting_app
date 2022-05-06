<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ListController;
use App\Http\Controllers\Module\UserController;
use App\Http\Controllers\General\RoleController;
use App\Http\Controllers\General\MilestoneController;
use App\Http\Controllers\General\PermissionController;
use App\Http\Controllers\Administrator\AuthenticationLogController;

Route::get('login', [AuthController::class, 'loginView'])->name('loginView')->middleware('guest:admin');
Route::post('login', [AuthController::class, 'attempt'])->name('login');

Route::group(['middleware' => ['auth:admin']], function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    // SYSTEM ROUTES
    Route::get('/', [AppController::class, 'index'])->name('index');

    Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

    Route::post('/audits', [AppController::class, 'getModelAudits'])->name('getModelAudits');

    Route::post('/update-user-password', [AppController::class, 'updatePassowrd'])->name('password.update');

    /* --------------- ADMINS -------------------- */
    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::resource('admin', ListController::class);
        Route::resource('artist', UserController::class);
    });




    /* --------------- USERS -------------------- */
    Route::patch('/users/update-status', [UserController::class, 'updateStatus'])->name('users.updateStatus');

    /* --------------- GENERAL ROUTES -------------------- */
    Route::group(['prefix' => 'general-configuration', 'as' => 'config.', 'title' => 'General Configurations'], function () {

        /* --------------- MENU BUILDER -------------------- */
        Route::view('menu-builder', 'general_config.menu_builder.index')->name('menu_builder');

        /* --------------- Roles -------------------- */
        Route::resource('roles', RoleController::class);

        /* --------------- Permissions -------------------- */
        Route::resource('permissions', PermissionController::class);
    });

    /* --------------- Milestone -------------------- */
    Route::resource('milestone', MilestoneController::class);

    Route::get('/terms-and-conditions', [ParameterController::class, 'termsAndConditions'])->name('termsAndConditions');
    Route::post('/update-terms-and-conditions', [ParameterController::class, 'updatetermsAndConditions'])->name('updatetermsAndConditions');

    /* --------------- Privacy Policy -------------------- */
    Route::get('/privacy-policy', [ParameterController::class, 'privacyPolicy'])->name('privacyPolicy');
    Route::post('/update-privacy-policy', [ParameterController::class, 'updatePrivacyPolicy'])->name('updatePrivacyPolicy');

    /* --------------- Master ROUTES -------------------- */
    Route::group(['prefix' => 'administrator', 'as' => 'administrator.', 'title' => 'Administrator'], function () {
        Route::resource('authentication-logs', AuthenticationLogController::class);
    });
});