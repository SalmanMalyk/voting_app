<?php

namespace App\Actions\Admin;

use App\Models\Admin;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class UpdateAdmin
{   
    /**
     * update admin account
     * 
     * @param Admin $admin admin which is going to be updated
     * @param array $data validated request array
     * 
     * @return Admin $admin
     */
    public static function execute(Admin $admin, array $data) : Admin
    {
        $admin->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if ($data['password']) {
            $admin->password = Hash::make($data['password']);
            $admin->save();
        }
        $role = Role::find($data['role_id']);
        $admin->syncRoles([$role->name]);

        return $admin;
    }
}