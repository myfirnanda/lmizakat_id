<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class IsPublisher
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
            if (!$user && $user->role !== "superadmin" && $user->role !== "admin" && $user->role !== "publisher") {
                // abort(403, 'Unauthorized action.');
            }
        }
        // if (Gate::denies('superadmin') && Gate::denies('admin') && Gate::denies('publisher')) {
        //     abort(403, 'Unauthorized action.');
        // }
        return $next($request);
    }
}
