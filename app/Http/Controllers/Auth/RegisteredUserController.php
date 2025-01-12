<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'age' => 'nullable|integer|min:0|max:150',
                'phone' => ['nullable', 'string', 'regex:/^01[0-9]{8,9}$/'],
                'address_1' => 'nullable|string|max:255',
                'address_2' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'postcode' => 'nullable|string|max:5',
                'country' => 'nullable|string|max:100',
            ]);

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'usertype' => 'user',
                'age' => $validated['age'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'address_1' => $validated['address_1'] ?? null,
                'address_2' => $validated['address_2'] ?? null,
                'city' => $validated['city'] ?? null,
                'state' => $validated['state'] ?? null,
                'postcode' => $validated['postcode'] ?? null,
                'country' => $validated['country'] ?? 'Malaysia',
                'remember_token' => Str::random(60),
                'email_verified_at' => null  // This will be updated when user verifies email
            ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage());
            return back()
                ->withInput($request->except('password'))
                ->withErrors(['email' => 'Registration failed. Please try again.']);
        }
    }
}
