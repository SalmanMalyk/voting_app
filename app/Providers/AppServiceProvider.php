<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Schema::defaultStringLength(191);

        if ($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        // $knownDate = now('PKT')->addDays(4);
        // Carbon\Carbon::setTestNow($knownDate);  

        Paginator::useBootstrap();
    }
}
