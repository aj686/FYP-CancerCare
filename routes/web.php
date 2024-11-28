<?php

use App\Http\Controllers\CancerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Database\Query\IndexHint;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\PlanController;


// HomeController route
// Route::get('/homepage/guest', [HomeController::class, 'indexGuest'])->name('home-page.guest');
Route::get('/homepage', [HomeController::class, 'index'])->name('home-page');

Route::get('/cancer-information', [HomeController::class, 'cancerInformation'])->name('cancerInformation-page');

// Module 2
Route::get('/get-involved', [HomeController::class, 'getInvolved'])->name('getInvolved-page');
Route::get('/get-involved/{event}', [HomeController::class, 'showEvent'])->name('events.show.event');


Route::get('/our-research', [HomeController::class, 'ourResearch'])->name('ourResearch-page');
Route::get('/our-research/{title}', [HomeController::class, 'showBlog'])->name('events.show.blog');

Route::get('/about', [HomeController::class, 'about'])->name('about-page');

// Group routes under /cancer-information
Route::prefix('/cancer-information.guest')->group(function () {
    // CancerController route nested under cancer-information
    Route::get('/about-cancer', [CancerController::class, 'aboutCancer'])->name('cancer.about');
    Route::get('/cancer-types', [CancerController::class, 'cancerTypes'])->name('cancer.types');
    Route::get('/cancer-treatments', [CancerController::class, 'treatments'])->name('cancer.treatments');
    Route::get('/cancer-prevention', [CancerController::class, 'prevention'])->name('cancer.prevention');
    Route::get('/cancer-detection', [CancerController::class, 'detection'])->name('cancer.detection');
    Route::get('/cancer-recovery', [CancerController::class, 'recovery'])->name('cancer.recovery');
    Route::get('/cancer-diagnosis', [CancerController::class, 'diagnosis'])->name('cancer.diagnosis');

});

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

// Plan routes
Route::get('/plan', [PlanController::class, 'index'])->name('plan.index');




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
})->middleware(['auth', 'verified', 'user'])->name('dashboard');

Route::middleware(['auth', 'user'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User-specific routes
    Route::get('/user/bookings', [UserController::class, 'bookings'])->name('user.bookings');
    Route::post('/bookings/{eventRegistration}/cancel', [UserController::class, 'cancelBooking'])->name('bookings.cancel');

    Route::get('/user/orders', [UserController::class, 'orders'])->name('user.orders');
    Route::get('/invoice/{order}', [UserController::class, 'showInvoice'])->name('order.invoice');

    // Event Registration
    Route::post('/events/{event}/register', [EventRegistrationController::class, 'register'])->name('events.register');
    Route::delete('/events/{event}/cancel', [EventRegistrationController::class, 'cancel'])->name('events.cancel');

    // Membership routes
    Route::post('/membership/subscribe/{slug}', [MembershipController::class, 'subscribe'])->name('membership.subscribe');
    Route::get('/membership/success', [MembershipController::class, 'success'])->name('membership.success');
    Route::get('/membership/cancel', [MembershipController::class, 'cancel'])->name('membership.cancel');

    // Plan routes
    // Route::get('/plan', [PlanController::class, 'index'])->name('plan.index');

    // // Homepage
    // Route::get('/homepage', [HomeController::class, 'index'])->name('home-page');

    // // Module 2
    // Route::get('/get-involved', [HomeController::class, 'getInvolved'])->name('getInvolved-page');
    // Route::get('/get-involved/{event}', [HomeController::class, 'showEvent'])->name('events.show.event');


    // Route::get('/our-research', [HomeController::class, 'ourResearch'])->name('ourResearch-page');
    // Route::get('/our-research/{title}', [HomeController::class, 'showBlog'])->name('events.show.blog');

    // Route::get('/about', [HomeController::class, 'about'])->name('about-page');

    // Route::get('/cancer-information', [HomeController::class, 'cancerInformation'])->name('cancerInformation-page');

    // // Group routes under /cancer-information
    // Route::prefix('/cancer-information')->group(function () {
    //     // CancerController route nested under cancer-information
    //     Route::get('/about-cancer', [CancerController::class, 'aboutCancer'])->name('cancer.about');
    //     Route::get('/cancer-types', [CancerController::class, 'cancerTypes'])->name('cancer.types');
    //     Route::get('/cancer-treatments', [CancerController::class, 'treatments'])->name('cancer.treatments');
    //     Route::get('/cancer-prevention', [CancerController::class, 'prevention'])->name('cancer.prevention');
    //     Route::get('/cancer-detection', [CancerController::class, 'detection'])->name('cancer.detection');
    //     Route::get('/cancer-recovery', [CancerController::class, 'recovery'])->name('cancer.recovery');
    //     Route::get('/cancer-diagnosis', [CancerController::class, 'diagnosis'])->name('cancer.diagnosis');

    // });

    // // ProductController route
    // Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    // // {products} is a slug route declare in Products model
    // Route::get('/product/{products}', [ProductController::class, 'show'])->name('product.show');

    // // CartController 
    // Route::get('/cart', [CartController::class, 'showCart'])->name('cart.show');
    // // Route to add a product to the cart
    // Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
    // Route::post('/cart/update', [CartController::class, 'updateCart'])->name('cart.update');

    // // CheckController 
    // Route::get('/checkout', [CheckoutController::class, 'showOrder'])->name('checkout.show');
    // Route::post('/checkout', [CheckoutController::class, 'createOrder'])->name('checkout.create');
});

// Webhook route (no auth middleware)
Route::post('/stripe/webhook/membership', [MembershipController::class, 'handleWebhook']);

require __DIR__.'/auth.php';


 // Admin routes
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
        Route::get('/admin/programs', [AdminController::class, 'programs'])->name('admin.programs');
        Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
        Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
        Route::get('/admin/payments', [AdminController::class, 'payments'])->name('admin.payments');
        Route::get('/admin/blogs', [AdminController::class, 'blogs'])->name('admin.blogs');
        Route::get('/admin/registration', [AdminController::class, 'eventRegistration'])->name('admin.registration');
        Route::get('/admin/membership', [AdminController::class, 'membership'])->name('admin.membership');
        Route::get('/admin/plans', [AdminController::class, 'plans'])->name('admin.plans');
        
        // product CRUD 
        Route::post('/admin/create', [AdminController::class, 'create'])->name('admin.products.create');
        Route::patch('/admin/update/{id}', [AdminController::class, 'update'])->name('admin.products.update');
        Route::delete('/admin/destroy/{id}', [AdminController::class, 'destroy'])->name('admin.products.delete');
    
        // user CRUD
        Route::post('/admin/create-user', [AdminController::class, 'createUser'])->name('admin.users.create');
        Route::patch('/admin/update-user/{id}', [AdminController::class, 'updateUser'])->name('admin.users.update');
        Route::delete('/admin/destroy-user/{id}', [AdminController::class, 'destroyUser'])->name('admin.users.delete');

        // program CRUD
        Route::post('/admin/create-event', [AdminController::class, 'createEvent'])->name('admin.events.create');
        Route::patch('/admin/update-event/{id}', [AdminController::class, 'updateEvent'])->name('admin.events.update');
        Route::delete('/admin/destroy-event/{id}', [AdminController::class, 'destroyEvent'])->name('admin.events.delete');
        Route::get('/admin/view-event/{id}', [AdminController::class, 'viewEvent'])->name('admin.events.view');
        
        // order 
        Route::get('/admin/view-order/{id}', [AdminController::class, 'orderView'])->name('admin.orders.view');
        Route::post('/admin/orders/{id}/update-status', [PaymentController::class, 'updateStatus'])->name('admin.orders.updateStatus');
        
        // payment
        Route::get('/admin/view-payment/{id}', [AdminController::class, 'paymentView'])->name('admin.payments.view');

        // blog
        Route::post('/admin/create-blog', [AdminController::class, 'createBlogs'])->name('admin.blogs.create');
        Route::patch('/admin/update-blog/{id}', [AdminController::class, 'updateBlogs'])->name('admin.blogs.update');
        Route::delete('/admin/destroy-blog/{id}', [AdminController::class, 'destroyBlogs'])->name('admin.blogs.delete');
    
        // event registration
        Route::patch('/admin/update-regisration/{id}', [AdminController::class, 'updateEventRegistration'])->name('admin.registration.update');
        Route::delete('/admin/destroy-registration/{id}', [AdminController::class, 'destroyEventRegistration'])->name('admin.registration.delete');

        // membership
        Route::patch('/admin/update-membership/{id}', [AdminController::class, 'updateMembership'])->name('admin.membership.update');
        Route::delete('/admin/destroy-membership/{id}', [AdminController::class, 'destroyMembership'])->name('admin.membership.delete');

        // plans
        Route::post('/admin/create-plans', [AdminController::class, 'createPlans'])->name('admin.plans.create');
        Route::patch('/admin/update-plans/{id}', [AdminController::class, 'updatePlans'])->name('admin.plans.update');
        Route::delete('/admin/destroy-plans/{id}', [AdminController::class, 'destroyPlans'])->name('admin.plans.destroy');
    });
    