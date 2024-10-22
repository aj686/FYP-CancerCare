<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{

    // Display the shop page (all products)
    public function index() {

        // fetch all products
        $allProducts = Products::all(); 
        return Inertia::render("Product/Product", ['all_products' => $allProducts]);
    }

    // Show a single product detail
    // public function show($id) {
        
    //     $product = Products::find($id);
    //     if(!$product) {
    //         return redirect()->route('product.index')->with('error', 'Product not found.');
    //     }
    //     // Logic to fetch product details goes here
    //     return Inertia::render("Product/ProductDetails", ['product' => $product]);
    // }

    public function show(Products $products) {
        return Inertia::render("Product/ProductDetails", ['product' => $products]);
    }
}