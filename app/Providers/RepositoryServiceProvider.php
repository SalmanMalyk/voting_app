<?php

namespace App\Providers;

use App\Console\Commands\MakeInterface;
use App\Console\Commands\MakeRepository;
use App\Console\Commands\MakeRepositoryInterface;
use App\Repository\CustomerRepositoryInterface;
use App\Repository\EloquentRepositoryInterface;
use App\Repository\Eloquent\BaseRepository;
use App\Repository\Eloquent\CustomerRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // binding commands
        $this->commands([
            MakeInterface::class,
            MakeRepository::class,
            MakeRepositoryInterface::class
        ]);
        // Binding base repository
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        // binding new repositories here
        $this->app->bind(CustomerRepositoryInterface::class, CustomerRepository::class);
        $this->app->bind(CustomerBranchRepository::class, CustomerBranchRepositoryInterface::class);
        $this->app->bind(InvoiceRepository::class, InvoiceRepositoryInterface::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
