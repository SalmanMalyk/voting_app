<?php

namespace App\Providers;

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
        $this->app->register(RepositoryServiceProvider::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Schema::defaultStringLength(191);
       
        Blade::directive('currency', function ($amount) {
            if($amount) {
                return "<?php echo number_format($amount); ?>";
            } else {
                return null;
            }
        });

        if ($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        \Illuminate\Database\Query\Builder::macro('toRawSql', function () {
            return array_reduce($this->getBindings(), function ($sql, $binding) {
                return preg_replace('/\?/', is_numeric($binding) ? $binding : "'" . $binding . "'", $sql, 1);
            }, $this->toSql());
        });

        // $knownDate = now('PKT')->addDays(4);
        // Carbon\Carbon::setTestNow($knownDate);  
    }
}
