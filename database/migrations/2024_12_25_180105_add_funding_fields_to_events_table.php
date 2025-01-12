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
        Schema::table('events', function (Blueprint $table) {
            $table->after('status', function (Blueprint $table) {
                $table->decimal('funding_goal', 10, 2)->nullable();
                $table->text('funding_description')->nullable();
                $table->date('funding_end_date')->nullable(); 
                $table->json('funding_categories')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'funding_goal',
                'funding_description',
                'funding_end_date', 
                'funding_categories'
            ]);
        });
    }
};
