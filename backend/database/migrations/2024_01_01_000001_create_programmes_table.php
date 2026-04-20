<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->string('nom_fr');
            $table->string('nom_ar')->nullable();
            $table->text('description_fr');
            $table->text('description_ar')->nullable();
            $table->string('icone')->nullable();
            $table->string('couleur')->nullable();
            $table->year('annee_lancement')->nullable();
            $table->enum('statut', ['Actif', 'En cours', 'Terminé'])->default('Actif');
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
