<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // Foreign key for orders
            $table->string('ordernumber'); // Order number for reference
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key for users
            $table->string('stripe_session_id'); // Stripe session ID
            $table->string('payment_method'); // Payment method (e.g., card)
            $table->decimal('amount', 10, 2); // Payment amount (with 2 decimal places)
            $table->string('payment_status'); // Payment status (e.g., paid, pending, failed)
            $table->date('payment_date'); // Date of the payment
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
