<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Products::query();
        
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        $allProducts = $query->paginate(4);
        $allProducts->appends(request()->query());

        return Inertia::render("Product/Product", [
            'all_products' => $allProducts,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'warning' => session('warning'),
                'message' => session('message'),
            ]
        ]);
    }

    public function show(Products $products) 
    {
        return Inertia::render("Product/ProductDetails", [
            'product' => $products,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'warning' => session('warning'),
                'message' => session('message'),
            ]
        ]);
    }
}