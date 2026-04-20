<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_fr', 'nom_ar', 'description_fr', 'description_ar',
        'icone', 'couleur', 'annee_lancement', 'statut', 'slug'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
