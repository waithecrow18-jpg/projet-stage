<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre_fr', 'titre_ar', 'contenu_fr', 'contenu_ar',
        'extrait_fr', 'extrait_ar', 'image', 'categorie',
        'date_publication', 'slug', 'is_published'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'date_publication' => 'date',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
