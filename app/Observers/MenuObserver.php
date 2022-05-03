<?php

namespace App\Observers;

use Illuminate\Support\Str;
use Harimayco\Menu\Models\Menus;
use Harimayco\Menu\Models\MenuItems;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Models\Permission;

class MenuObserver
{
    /**
     * Handle the MenuItems "created" event.
     *
     * @param  \App\Models\Harimayco\Menu\Models\MenuItems  $menuItems
     * @return void
     */
    public function created(MenuItems $menuItems)
    {
        $permissions = config('constants.permissions');

        foreach ($permissions as $permission) {
            $name = Str::snake($permission . ' ' . $menuItems->label);
            
            Permission::updateOrCreate(['name' => $name, 'menu_item_id' => $menuItems->id], [
                'name' => $name,
                'guard_name' => 'sanctum',
                'menu_item_id' => $menuItems->id,
                'permission_name' => $permission,
                'module_name' => Str::snake($menuItems->label),
            ]);
        }

        $this->updateCache();
    }

    /**
     * Handle the MenuItems "updated" event.
     *
     * @param  \App\Models\Harimayco\Menu\Models\MenuItems  $menuItems
     * @return void
     */
    public function updated(MenuItems $menuItems)
    {
        $this->updateCache();
    }

    /**
     * Handle the menu items "updating" event.

     * @param  \App\MenuItems  $menuItems
     * @return void
     */
    public function updating(MenuItems $menuItems)
    {
        if ($menuItems->isDirty('label')) {
            // email has changed
            $new_name    = $menuItems->label; 
            $old_name    = $menuItems->getOriginal('label');
            $permissions = Permission::where('module_name', Str::snake($old_name))->get();

            if (count($permissions) > 0) {
                foreach ($permissions as $permission) {
                    $permission->module_name = Str::snake($menuItems->label);
                    $permission->guard_name  = "sanctum";
                    $permission->name        = Str::snake($permission->permission_name. ' '.$new_name);
                    $permission->update();
                }
            }
            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        }
    }

    /**
     * Handle the MenuItems "deleted" event.
     *
     * @param  \App\Models\Harimayco\Menu\Models\MenuItems  $menuItems
     * @return void
     */
    public function deleted(MenuItems $menuItems)
    {
        Permission::where('menu_item_id', $menuItems->id)->delete();
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        $this->updateCache();
    }


    /**
     * Removing and updating cache chunk
     * @return Void
     */
    private function updateCache()
    {
        Cache::forget('menu');

        // store new cache data
        $system_menu = Menus::where('selected', true)
            ->with([
                "items" => function ($builder) {
                    $builder->whereStatus(true);
                },
                "items.child" => function ($builder) {
                    $builder->whereStatus(true);
                }
            ])
            ->first();

        Cache::put('menu', $system_menu, now()->addHours(1));
    }
}
