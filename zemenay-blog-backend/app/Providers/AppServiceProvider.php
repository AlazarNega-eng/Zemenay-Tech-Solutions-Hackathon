<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Number;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Workaround for missing intl extension
        if (!extension_loaded('intl')) {
            // Override the Number::format method to use a simple fallback
            Number::macro('format', function ($number, $decimals = 0, $decimalSeparator = '.', $thousandsSeparator = ',') {
                return number_format($number, $decimals, $decimalSeparator, $thousandsSeparator);
            });
        }
    }
}
