<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use App\Enums\UserType;
use Illuminate\Support\Str;
use function PHPSTORM_META\map;
use Illuminate\Database\Seeder;
use Harimayco\Menu\Models\Menus;

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

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

        Menus::create([
            'name' => 'Main Menu',
            'selected' => true
        ]);
    }
}