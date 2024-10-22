<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentController;

// HomeController route
Route::get('/homepage', [HomeController::class, 'index'])->name('home-page');
Route::get('/cancer-information', [HomeController::class, 'cancerInformation'])->name('cancerInformation-page');
Route::get('/get-involved', [HomeController::class, 'getInvolved'])->name('getInvolved-page');
Route::get('/our-research', [HomeController::class, 'ourResearch'])->name('ourResearch-page');
Route::get('/about', [HomeController::class, 'about'])->name('about-page');

// ProductController route
Route::get('/product', [ProductController::class, 'index'])->name('product.index');
// {products} is a slug route declare in Products model
Route::get('/product/{products}', [ProductController::class, 'show'])->name('product.show');

// CartController 
Route::get('/cart', [CartController::class, 'showCart'])->name('cart.show');
// Route to add a product to the cart
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
Route::post('/cart/update', [CartController::class, 'updateCart'])->name('cart.update');

// CheckController 
Route::get('/checkout', [CheckoutController::class, 'showOrder'])->name('checkout.show');
Route::post('/checkout', [CheckoutController::class, 'createOrder'])->name('checkout.create');

//PaymentController 
Route::post('/pay-order/{order}', [PaymentController::class, 'payOrderByStripe'])->name('payment.pay');
Route::get('/payment/success/{order_id}', [PaymentController::class, 'paymentSuccess'])->name('payment.success');
Route::get('/payment/cancel/{order_id}', [PaymentController::class, 'paymentCancel'])->name('payment.cancel');




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
