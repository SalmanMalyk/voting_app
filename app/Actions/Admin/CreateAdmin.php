<?php

namespace App\Actions\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class CreateAdmin
{
    public static function execute($admin)
    {
        $adminUser = Admin::create([
            'name' => $admin['name'],
            'email' => $admin['email'],
            'password' => Hash::make($admin['password']),
        ]);
        $adminUser->assignRole(Role::find($admin['role_id']));

        return $admin;
    }
}