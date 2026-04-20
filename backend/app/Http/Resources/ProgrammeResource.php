<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgrammeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $lang = $request->query('lang', 'fr');

        return [
            'id' => $this->id,
            'title' => $lang === 'ar' && $this->nom_ar ? $this->nom_ar : $this->nom_fr,
            'description' => $lang === 'ar' && $this->description_ar ? $this->description_ar : $this->description_fr,
            'icon' => $this->icone,
            'color' => $this->couleur,
            'year' => $this->annee_lancement,
            'status' => $this->statut,
            'slug' => $this->slug,
        ];
    }
}
