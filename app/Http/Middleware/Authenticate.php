<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function unauthenticated($request, array $guards)
    {
        throw new AuthenticationException(
            'Unauthenticated.',
            $guards,
            $this->guardRedirect($request, $guards)
        );
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function guardRedirect($request, $guards)
    {
        if (!$request->expectsJson()) {
            if (in_array('admin', $guards)) {
                return route('dashboard.loginView');
            } else if (in_array('sanctum', $guards)) {
                return route('login');
            }
        }
    }
}