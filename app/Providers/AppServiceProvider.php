<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

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
        Gate::define('superadmin', function (User $user) {
            return $user->role === "superadmin";
        });
        Gate::define('admin', function (User $user) {
            return $user->role === "admin";
        });
        Gate::define('writer', function (User $user) {
            return $user->role === "writer";
        });
        Gate::define('publisher', function (User $user) {
            return $user->role === "publisher";
        });
    }
}
