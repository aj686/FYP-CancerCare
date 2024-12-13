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
use App\Http\Controllers\DonationController;
use App\Http\Controllers\UserStoryController;



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
Route::prefix('/cancer-information')->group(function () {
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
// Route::get('/payment/{payment}/invoice', [PaymentController::class, 'getInvoice'])->name('payment.invoice');
// Route::post('/webhook/stripe/payment', [PaymentController::class, 'handleWebhook'])->name('payment.webhook');

// Plan routes
Route::get('/plan', [PlanController::class, 'index'])->name('plan.index');

 // Membership
 Route::post('/stripe/webhook', [MembershipController::class, 'handleWebhook'])->name('stripe.webhook');

 // Donation
 // routes/web.php
// Route::controller(DonationController::class)->group(function () {
//     Route::get('/donate', 'show')->name('donate.show');
//     Route::post('/donate/initiate', 'initiateDonation')->name('donation.initiate');
//     // Remove donation_id parameter from success route
//     Route::get('/donate/success', 'success')->name('donation.success');
//     Route::get('/donate/cancel', 'cancel')->name('donation.cancel');
//     Route::post('/stripe/webhook', 'handleWebhook')->name('donation.webhook');
// });

Route::get('/donate', [DonationController::class, 'show'])->name('donate.show');
Route::get('/donate/initiate', [DonationController::class, 'initiateDonation'])->name('donation.initiate');
Route::get('/donate/success', [DonationController::class, 'success'])->name('donation.success');
Route::get('/donate/cancel', [DonationController::class, 'cancel'])->name('donation.cancel');
Route::get('/stripe/webhook', [DonationController::class, 'handleWebhook'])->name('donation.webhook');



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
    Route::post('membership/subscribe/{plan}', [MembershipController::class, 'subscribe'])->name('membership.subscribe');
    Route::get('membership/success', [MembershipController::class, 'success'])->name('membership.success');
    Route::get('membership/cancel', [MembershipController::class, 'cancel'])->name('membership.cancel');
    
    // User Story
    Route::get('/stories', [UserStoryController::class, 'index'])->name('stories.index');
    Route::get('/stories/{slug}', [UserStoryController::class, 'show'])->name('stories.show');

    // Routes that require membership
    Route::middleware('membership')->group(function () {
        Route::get('/user/my-stories', [UserStoryController::class, 'myStories'])->name('stories.my-stories');
        Route::get('/stories/create/new', [UserStoryController::class, 'create'])->name('stories.create');
        Route::post('/stories', [UserStoryController::class, 'store'])->name('stories.store');
        Route::get('/stories/{story}/edit', [UserStoryController::class, 'edit'])->name('stories.edit');
        Route::patch('/stories/{story}', [UserStoryController::class, 'update'])->name('stories.update');
        Route::delete('/stories/{story}', [UserStoryController::class, 'destroy'])->name('stories.destroy');
    });

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
    
        // user story
        Route::get('/admin/stories', [AdminController::class, 'stories'])->name('admin.stories');
        Route::get('/admin/stories/{id}', [AdminController::class, 'viewStory'])->name('admin.stories.view');
        Route::patch('/admin/stories/{id}/status', [AdminController::class, 'updateStoryStatus'])->name('admin.stories.update-status');
        Route::delete('/admin/stories/{id}', [AdminController::class, 'destroyStory'])->name('admin.stories.destroy');
    });
    