<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre_fr', 'titre_ar', 'fichier_pdf', 'categorie',
        'date_publication', 'auteur', 'slug'
    ];

    protected $casts = [
        'date_publication' => 'date',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Accessor
    public function getFichierUrlAttribute()
    {
        return $this->fichier_pdf ? Storage::url($this->fichier_pdf) : null;
    }
}
