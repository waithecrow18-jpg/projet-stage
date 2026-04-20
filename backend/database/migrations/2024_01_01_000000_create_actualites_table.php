<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('actualites', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar')->nullable();
            $table->text('contenu_fr');
            $table->text('contenu_ar')->nullable();
            $table->text('extrait_fr');
            $table->text('extrait_ar')->nullable();
            $table->string('image')->nullable();
            $table->enum('categorie', ['News', 'Événements', 'Communiqués'])->default('News');
            $table->date('date_publication');
            $table->string('slug')->unique();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('actualites');
    }
};
