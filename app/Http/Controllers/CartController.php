<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    // Show products added in cart
    public function showCart() 
    {
        $cart = session()->get('cart', []);
        
        // Log cart contents for debugging
        Debugbar::info('Cart Contents:', $cart);
        
        return inertia('Cart', [
            'cart' => $cart,
            'isAuthenticated' => Auth::check(),
            'user' => Auth::user() ? [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ] : null,
            'flash' => [
                'message' => Session::get('message'),
                'error' => Session::get('error'),
                'success' => Session::get('success'),
                'warning' => Session::get('warning')
            ]
        ]);
    }

    // Add product to cart
    public function addToCart(Request $request) 
    {   
        // Find product by slug
        $product = Products::where('slug', $request->input('slug'))->first();

        if (!$product) {
            return redirect()->route('product.index')->with('error', 'Product not found.');
        }

        // Get cart from session
        $cart = Session::get('cart', []);
        
        // Check if product already exists in the cart
        if (isset($cart[$product->id])) {
            // Increase the quantity if the product already exists
            $cart[$product->id]['quantity']++;
            $message = 'Product quantity updated in cart.';
        } else {
            // Add new product to cart
            $cart[$product->id] = [
                'id' => $product->id,
                'name' => $product->name,
                'image' => $product->image,
                'price' => $product->price,
                'quantity' => 1,
                'added_by_user' => Auth::check() ? Auth::id() : null,
                'added_at' => now()->toDateTimeString()
            ];
            $message = 'Product added to cart.';
        }

        // Store the updated cart back into session
        Session::put('cart', $cart);

        // Log for debugging
        Debugbar::info('Product added to cart:', [
            'product_id' => $product->id,
            'user_id' => Auth::id(),
            'cart_contents' => $cart
        ]);

        // Change this line to redirect back to the same page instead of cart.show
        return redirect()->back()->with('success', $message);
    }

    // Update quantity and price
    public function updateCart(Request $request) 
    {
        try {
            // Get the updated cart from the request
            $updatedCart = $request->input('cart');

            // Validate the cart data
            if (!is_array($updatedCart)) {
                throw new \Exception('Invalid cart data');
            }

            // Preserve user information if it exists
            $currentCart = Session::get('cart', []);
            foreach ($updatedCart as $productId => $item) {
                if (isset($currentCart[$productId])) {
                    $updatedCart[$productId]['added_by_user'] = $currentCart[$productId]['added_by_user'] ?? null;
                    $updatedCart[$productId]['added_at'] = $currentCart[$productId]['added_at'] ?? now()->toDateTimeString();
                }
            }

            // Save the updated cart to the session
            Session::put('cart', $updatedCart);

            // Log the update for debugging
            Debugbar::info('Cart updated:', [
                'user_id' => Auth::id(),
                'updated_cart' => $updatedCart
            ]);

            return redirect()->back()->with('success', 'Cart updated successfully');
        } catch (\Exception $e) {
            Log::error('Cart update failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);
            return redirect()->back()->with('error', 'Failed to update cart');
        }
    }

    // Remove product from cart
    public function removeProduct(Request $request) 
    {
        try {
            $productId = $request->input('product_id');
            $cart = Session::get('cart', []);

            if (isset($cart[$productId])) {
                // Log removal for debugging
                Debugbar::info('Removing product from cart:', [
                    'product_id' => $productId,
                    'user_id' => Auth::id()
                ]);

                unset($cart[$productId]);
                Session::put('cart', $cart);

                return redirect()->back()->with('success', 'Product removed from cart.');
            }

            return redirect()->back()->with('error', 'Product not found in cart.');
        } catch (\Exception $e) {
            Log::error('Remove product failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'product_id' => $request->input('product_id')
            ]);
            return redirect()->back()->with('error', 'Failed to remove product');
        }
    }

    // Clear cart
    public function clearCart() 
    {
        try {
            Session::forget('cart');
            return redirect()->back()->with('success', 'Cart cleared successfully.');
        } catch (\Exception $e) {
            Log::error('Clear cart failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);
            return redirect()->back()->with('error', 'Failed to clear cart');
        }
    }

    // Get cart count for nav badge
    public function getCartCount() 
    {
        try {
            $cart = Session::get('cart', []);
            return response()->json([
                'success' => true,
                'count' => count($cart),
                'total' => $this->calculateTotal($cart)
            ]);
        } catch (\Exception $e) {
            Log::error('Get cart count failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);
            return response()->json([
                'success' => false,
                'error' => 'Failed to get cart count'
            ], 500);
        }
    }

    // Calculate cart total
    private function calculateTotal($cart) 
    {
        return array_reduce($cart, function($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);
    }
}