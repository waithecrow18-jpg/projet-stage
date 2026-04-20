<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partenaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('logo')->nullable();
            $table->string('url')->nullable();
            $table->enum('type', ['bilateral', 'multilateral', 'ong'])->default('bilateral');
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partenaires');
    }
};
