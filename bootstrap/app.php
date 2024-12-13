<?php


use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class, 
        ]);


        // Exclude from CSRF
        $middleware->validateCsrfTokens(except: [
            '/stripe/webhook',
            '/stripe/webhook/payment',
            '/stripe/webhook'
        ]);


    // role
        $middleware->alias([
            'admin' => \App\Http\Middleware\Admin::class,
            'user' => \App\Http\Middleware\User::class,
            'membership' => \App\Http\Middleware\CheckMembership::class,
            ]);
        })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
