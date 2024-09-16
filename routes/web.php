<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/homepage', [HomeController::class, 'index'])->name('home-page');
Route::get('/cancer-information', [HomeController::class, 'cancer'])->name('cancer-page');
Route::get('/get-involved', [HomeController::class, 'getInvolved'])->name('getInvolved-page');
Route::get('/our-research', [HomeController::class, 'ourResearch'])->name('ourResearch-page');
Route::get('/event', [HomeController::class, 'event'])->name('event-page');
Route::get('/shop', [HomeController::class, 'shop'])->name('shop-page');
Route::get('/about', [HomeController::class, 'about'])->name('about-page');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
