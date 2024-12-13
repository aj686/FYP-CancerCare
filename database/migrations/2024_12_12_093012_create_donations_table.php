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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('amount', 10, 2);
            $table->string('payment_status');
            $table->string('stripe_session_id')->nullable();
            
            // Donor Information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('identity_number');
            $table->string('race')->nullable();
            
            // Address Information
            $table->string('street_address')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country');
            
            // Additional Fields
            $table->boolean('newsletter_opt_in')->default(false);
            $table->timestamp('payment_date')->nullable();
            $table->timestamps();
            
            // Indexes for better query performance
            $table->index('payment_status');
            $table->index('stripe_session_id');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
