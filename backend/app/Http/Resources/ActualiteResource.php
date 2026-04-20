<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ActualiteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $lang = $request->query('lang', 'fr'); // default FR

        return [
            'id' => $this->id,
            'title' => $lang === 'ar' && $this->titre_ar ? $this->titre_ar : $this->titre_fr,
            'excerpt' => $lang === 'ar' && $this->extrait_ar ? $this->extrait_ar : $this->extrait_fr,
            'content' => $lang === 'ar' && $this->contenu_ar ? $this->contenu_ar : $this->contenu_fr,
            'image' => $this->image ? Storage::url($this->image) : null,
            'category' => $this->categorie,
            'date' => $this->date_publication ? $this->date_publication->format('d M Y') : null,
            'slug' => $this->slug,
            'is_published' => $this->is_published,
        ];
    }
}
