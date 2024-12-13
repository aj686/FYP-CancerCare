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
        Schema::table('payments', function (Blueprint $table) {
            $table->string('stripe_invoice_id')->nullable()->after('payment_date');
            $table->string('stripe_invoice_url')->nullable()->after('stripe_invoice_id');
            $table->string('invoice_pdf')->nullable()->after('stripe_invoice_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn([
                'stripe_invoice_id',
                'stripe_invoice_url',
                'invoice_pdf'
            ]);
        });
    }
};
