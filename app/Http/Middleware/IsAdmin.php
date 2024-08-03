<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user) {
            if ($user->role !== "superadmin" && $user->role !== "admin") {
                // abort(403, 'Unauthorized action.');
            }
        }
        // if (Gate::denies('superadmin') && Gate::denies('admin')) {
        //     abort(403, 'Unauthorized action.');
        // }
        return $next($request);
    }
}
