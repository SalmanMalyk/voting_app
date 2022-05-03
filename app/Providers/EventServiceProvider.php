<?php

namespace App\Providers;

use App\Events\OrderDelivered;
use App\Observers\MenuObserver;
use Harimayco\Menu\Models\MenuItems;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        OrderDelivered::class => [
            SendOrderDeliveredNotification::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {        
        MenuItems::observe(MenuObserver::class);
    }
}
