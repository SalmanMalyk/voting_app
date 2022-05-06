<?php

namespace App\Actions\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class CreateAdmin
{
    public static function execute($admin)
    {
        $adminUser = Admin::create([
            'name' => $admin['name'],
            'email' => $admin['email'],
            'password' => Hash::make($admin['passwor']),
        ]);

        $admin->assignRole(Role::find($request->role_id));
    }
}