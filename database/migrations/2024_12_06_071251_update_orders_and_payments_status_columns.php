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
        Schema::table('orders', function (Blueprint $table) {
            // Drop existing status columns if they exist
            if (Schema::hasColumn('orders', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('orders', 'shipping_status')) {
                $table->dropColumn('shipping_status');
            }

            // Add new enum columns
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->enum('shipping_status', ['pending', 'processing', 'shipped', 'delivered'])->default('pending');
        });

        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'payment_status')) {
                $table->dropColumn('payment_status');
            }

            $table->enum('payment_status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Revert back to original columns if needed
            $table->dropColumn(['status', 'shipping_status']);
            $table->string('status')->nullable();
            $table->string('shipping_status')->nullable();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('payment_status');
            $table->string('payment_status')->nullable();
        });
    }
};
