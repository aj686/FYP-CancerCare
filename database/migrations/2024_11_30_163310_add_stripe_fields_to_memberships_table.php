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
        Schema::table('memberships', function (Blueprint $table) {
            Schema::table('memberships', function (Blueprint $table) {
                $table->string('stripe_session_id')->nullable()->after('amount');
                $table->string('stripe_payment_id')->nullable()->after('stripe_session_id');
                $table->string('stripe_customer_id')->nullable()->after('stripe_payment_id');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            $table->dropColumn([
                'stripe_session_id',
                'stripe_payment_id',
                'stripe_customer_id'
            ]);
        });
    }
};
