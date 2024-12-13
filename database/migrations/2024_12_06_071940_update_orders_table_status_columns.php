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
        // First drop the existing columns if they exist
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('orders', 'shipping_status')) {
                $table->dropColumn('shipping_status');
            }
            if (Schema::hasColumn('orders', 'payment_method')) {
                $table->dropColumn('payment_method');
            }
        });

        // Then add the columns with correct specifications
        Schema::table('orders', function (Blueprint $table) {
            // Add the status column as enum with specific allowed values
            $table->enum('status', ['pending', 'paid', 'cancelled'])
                  ->default('pending');
            
            // Add the shipping_status column as enum with specific allowed values
            $table->enum('shipping_status', ['pending', 'processing', 'shipped', 'delivered'])
                  ->default('pending');
            
            // Add payment_method as a string column
            $table->string('payment_method')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['status', 'shipping_status', 'payment_method']);
        });
    }
};
