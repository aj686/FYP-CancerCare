<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Products;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',        
        'product_id',      
        'quantity',        
        'price',           
        'created_at',      
        'updated_at',  
    ];

    protected $casts = [
        'price' => 'float',
        'quantity' => 'integer'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
    
    // Helper method to get subtotal
    public function getSubtotal()
    {
        return $this->price * $this->quantity;
    }
}
