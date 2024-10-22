<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;
use App\Models\User;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ordernumber',
        'email',            // Add email here
        'firstname',
        'lastname',
        'address_1',
        'address_2',
        'city',
        'state',
        'postcode',
        'country',
        'phonenumber',
        'total_price',
        'shipping_status',
        'payment_method'
    ];

    // order belongs to user
    public function user() {
        return $this->belongsTo(User::class);
    }

    // one to many
    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }
}
