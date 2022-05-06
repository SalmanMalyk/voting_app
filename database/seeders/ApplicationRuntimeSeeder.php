<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function PHPSTORM_META\map;

class ApplicationRuntimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'role' => 'Super Admin',
                'type' => UserType::SuperAdmin,
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => 'Admin',
                'type' => UserType::Admin,
            ],
        ];

        foreach ($users as $user) {
            // CREATE ADMIN ACCOUNT
            $new = Admin::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
            ]);


            // Create Role
            $role = Role::create([
                'name'  => $user['role'],
                'guard_name' => 'admin',
            ]);

            // assign role to user
            $new->assignRole($role->id);
        }

        $user = User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}