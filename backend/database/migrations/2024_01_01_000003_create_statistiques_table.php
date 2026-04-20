<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statistiques', function (Blueprint $table) {
            $table->id();
            $table->string('cle')->unique();
            $table->string('valeur');
            $table->string('unite')->nullable();
            $table->string('description_fr')->nullable();
            $table->string('description_ar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statistiques');
    }
};
