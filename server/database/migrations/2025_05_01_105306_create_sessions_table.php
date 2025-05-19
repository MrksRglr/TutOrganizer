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
            $table->unsignedBigInteger('proposed_by');
            $table
                ->foreign('proposed_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->unsignedBigInteger('accepted_by')->nullable();
            $table
                ->foreign('accepted_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->enum('status', ['proposed', 'accepted', 'rejected']);
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
