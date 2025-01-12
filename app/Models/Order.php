<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;
use App\Models\User;

class Order extends Model
{
    use HasFactory;

    // Define constants for status
    const STATUS_PENDING = 'pending';
    const STATUS_PAID = 'paid';
    const STATUS_CANCELLED = 'cancelled';

    // Define constants for shipping status
    const SHIPPING_STATUS_PENDING = 'pending';
    const SHIPPING_STATUS_PROCESSING = 'processing';
    const SHIPPING_STATUS_SHIPPED = 'shipped';
    const SHIPPING_STATUS_DELIVERED = 'delivered';

    const COURIER_JANDT = 'J&T Express';
    const COURIER_POSLAJU = 'Pos Laju';
    const COURIER_DHL = 'DHL';
    const COURIER_FEDEX = 'FedEx';

    const PAYMENT_METHOD_STRIPE = 'stripe';
    const PAYMENT_METHOD_BILLPLZ = 'billplz';

    protected $fillable = [
        'user_id',
        'ordernumber',
        'stripe_session_id',
        'email',            
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
        'status',
        'shipping_status',
        'tracking_number',
        'courier_name',
        'payment_method'
    ];

    // Add status validation methods
    public static function getValidStatuses()
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_PAID,
            self::STATUS_CANCELLED
        ];
    }

    public static function getValidShippingStatuses()
    {
        return [
            self::SHIPPING_STATUS_PENDING,
            self::SHIPPING_STATUS_PROCESSING,
            self::SHIPPING_STATUS_SHIPPED,
            self::SHIPPING_STATUS_DELIVERED
        ];
    }

    // order belongs to user
    public function user() {
        return $this->belongsTo(User::class);
    }

    // one to many
    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // Helper methods
    public function isPaid()
    {
        return $this->status === self::STATUS_PAID;
    }

    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isCancelled()
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    public static function getValidPaymentMethods()
    {
        return [
            self::PAYMENT_METHOD_STRIPE,
            self::PAYMENT_METHOD_BILLPLZ
        ];
    }
}
