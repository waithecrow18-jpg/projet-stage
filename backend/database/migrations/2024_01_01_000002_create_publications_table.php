<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar')->nullable();
            $table->string('fichier_pdf');
            $table->string('categorie');
            $table->date('date_publication');
            $table->string('auteur')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
