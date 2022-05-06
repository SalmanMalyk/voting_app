<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Module\UserController;
use App\Http\Controllers\General\RoleController;
use App\Http\Controllers\General\MilestoneController;
use App\Http\Controllers\General\PermissionController;
use App\Http\Controllers\Administrator\AuthenticationLogController;

Route::get('login', [AuthController::class, 'loginView'])->name('loginView');
Route::post('login', [AuthController::class, 'attempt'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::group(['middleware' => ['admin']], function () {
    // SYSTEM ROUTES
    Route::get('/', [AppController::class, 'index'])->name('index');

    Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

    Route::post('/audits', [AppController::class, 'getModelAudits'])->name('getModelAudits');

    Route::post('/update-user-password', [AppController::class, 'updatePassowrd'])->name('password.update');

    /* --------------- USERS -------------------- */
    Route::get('/users/admins', [UserController::class, 'adminUser'])->name('users.adminUser');
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

    /* --------------- Master ROUTES -------------------- */
    Route::group(['prefix' => 'administrator', 'as' => 'administrator.', 'title' => 'Administrator', 'namespace' => 'App\Http\Controllers\Administrator'], function () {
        Route::resource('authentication-logs', AuthenticationLogController::class);
    });
});