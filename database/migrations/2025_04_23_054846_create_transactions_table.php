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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('supplier_code');
            $table->foreign('supplier_code')->references('supplier_code')->on('suppliers');
            $table->timestamp('supplier_in');
            $table->boolean('isArrivalOnTime')->nullable();
            $table->boolean('isUnloadingOnTime')->nullable();
            $table->timestamp('supplier_startBongkarMuat')->nullable();
            $table->timestamp('supplier_selesaiBongkarMuat')->nullable();
            $table->timestamp('supplier_out')->nullable();
            $table->integer('rit')->default(0);
            $table->timestamps();
        });
    }

    // $transaction

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
