<?php

namespace App\Providers;

use Harimayco\Menu\Models\Menus;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class MenuServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if (Schema::hasTable(config('menu.table_prefix') . config('menu.table_name_menus'))) {
            $system_menu = Cache::remember('menu', now()->addHours(1), function () {
                return Menus::where('selected', true)
                    ->with([
                        "items" => function ($builder) {
                            $builder->whereStatus(true);
                        },
                        "items.child" => function ($builder) {
                            $builder->whereStatus(true);
                        }
                    ])
                    ->latest()
                    ->first();
            });

            View::share([
                'system_menu' => $system_menu
            ]);
        }
    }
}