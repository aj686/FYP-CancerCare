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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('age')->nullable()->after('usertype');
            $table->string('cancer_type')->nullable()->after('age');
            $table->string('survivorship_status')->nullable()->after('cancer_type');
            $table->string('phone')->nullable()->after('survivorship_status');
            $table->text('address')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['age', 'cancer_type', 'survivorship_status', 'phone', 'address']);
        });
    }
};
