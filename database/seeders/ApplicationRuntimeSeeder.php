<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ApplicationRuntimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // CREATE ADMIN ACCOUNT
        $user = User::create([
            'name' => 'Super Admin',
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'email_verified_at' => now(),
            'user_type' => UserType::SuperAdmin,
            'password' => Hash::make('password'),
        ]);


        // Create Role
        $role = Role::create([
            'name'  => 'Super Admin',
            'guard_name' => 'sanctum',
        ]);

        // assign role to user
        $user->assignRole($role->id);
    }
}