<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class User
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated first
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Then check if user is not admin
        if (Auth::user()->usertype === 'admin') {
            return redirect()->route('admin.dashboard')->with('error', 'Please login as a regular user to access this page.');
        }

        return $next($request);
    }
}