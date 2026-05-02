<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('habits', function (Blueprint $table) {
            $table->dropColumn(['reminder_time', 'reminder_days']);
            $table->json('reminder_times')->nullable()->after('frequency');
        });
    }

    public function down(): void
    {
        Schema::table('habits', function (Blueprint $table) {
            $table->dropColumn('reminder_times');
            $table->string('reminder_time')->nullable()->after('frequency');
            $table->json('reminder_days')->nullable()->after('reminder_time');
        });
    }
};
