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
        Schema::create('arrival_rules', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('supplier_code');
            $table->foreign('supplier_code')->references('supplier_code')->on('suppliers');
            $table->integer('rit');
            $table->time('jam_kedatangan');
            $table->integer('durasi_bongkar');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arrival_rules');
    }
};
