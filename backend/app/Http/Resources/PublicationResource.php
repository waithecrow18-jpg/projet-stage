<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $lang = $request->query('lang', 'fr');

        return [
            'id' => $this->id,
            'title' => $lang === 'ar' && $this->titre_ar ? $this->titre_ar : $this->titre_fr,
            'file_url' => $this->fichier_url, // Accessor from model
            'type' => $this->categorie,
            'date' => $this->date_publication ? $this->date_publication->format('d M Y') : null,
            'author' => $this->auteur,
            'slug' => $this->slug,
        ];
    }
}
