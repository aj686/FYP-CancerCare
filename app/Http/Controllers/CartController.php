<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Symfony\Component\ErrorHandler\Debug;
use Barryvdh\Debugbar\Facades\Debugbar;


class CartController extends Controller
{
    // show products added in cart
    public function showCart() {
        $cart = session()->get('cart', []);
        return inertia('Cart', ['cart' => $cart]);
    }

    // react component request (productSlug) to this method
    // add product into cart
    public function addToCart(Request $request) {   

        // Find product by slug
        $product = Products::where('slug', $request->input('slug'))->first();

        if (!$product) {
            return redirect()->route('product.index')->with('error', 'Product not found.');
            // return response()->json(['error' => 'Product not found.'], 404);
            // return Inertia::render('Product/Index', [
            //     'error' => 'Product not found.'
            // ]);
        }

        // Get cart from session or initialize an empty array if cart doesn't exist
        $cart = Session::get('cart', []);
        
        // Check if product already exists in the cart
        if (isset($cart[$product->id])) {
            // Increase the quantity if the product already exists
            $cart[$product->id]['quantity']++;
        } else {
            // Otherwise, add the product to the cart with initial quantity 1
            $cart[$product->id] = [
                'id'=> $product->id,
                'name' => $product->name,
                'image' => $product->image,
                'price' => $product->price,
                'quantity' => 1,
            ];
        }

        // Store the updated cart back into session
        Session::put('cart', $cart);

        // Redirect back to the product page with a success message
        return redirect()->route('product.index', $product->slug)->with('success', 'Product added to cart.');


        // Return a success response
        // return response()->json(['message' => 'Product added to cart successfully.'], 200);

        // Redirect back to product page with success message
        // return Inertia::render('Product/Index', [
        //     'success' => 'Product added to cart successfully.',
        //     'product' => $product, // You can send the product back if needed
        // ]);
    }

    // Update quantity and price 
    public function updateCart(Request $request) {
        // Access the updated cart from the request
        $cart = $request->input('cart');

        // Save the updated cart to the session, database, etc.
        session()->put('cart', $cart);

        return redirect()->back();
    }

    public function removeProduct() {}

    
}
