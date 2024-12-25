<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove old columns
            $table->dropColumn([
                'cancer_type',
                'survivorship_status',
                'address'
            ]);

            // Add new address columns
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postcode', 10)->nullable();
            $table->string('country')->default('Malaysia');
            
            // Modify usertype column
            $table->string('usertype')->default('user')->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Restore old columns
            $table->string('cancer_type')->nullable();
            $table->string('survivorship_status')->nullable();
            $table->text('address')->nullable();

            // Remove new address columns
            $table->dropColumn([
                'address_1',
                'address_2',
                'city',
                'state',
                'postcode',
                'country'
            ]);
        });
    }
};
