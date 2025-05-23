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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('offer_id')->constrained()->onDelete('cascade');;
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');
            $table->foreignId('proposed_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('accepted_by')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['proposed', 'accepted', 'rejected'])->default('proposed');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->text('comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
