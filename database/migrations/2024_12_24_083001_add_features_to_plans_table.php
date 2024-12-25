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
        Schema::table('plans', function (Blueprint $table) {
            $table->boolean('can_comment')->default(false)->after('description');
            $table->boolean('can_access_forum')->default(false)->after('can_comment');
            $table->boolean('can_access_events')->default(false)->after('can_access_forum');
            $table->boolean('can_share_stories')->default(false)->after('can_access_events');
            $table->string('billing_interval')->default('year')->after('can_share_stories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn([
                'can_comment',
                'can_access_forum', 
                'can_access_events',
                'can_share_stories',
                'billing_interval'
            ]);
        });
    }
};
