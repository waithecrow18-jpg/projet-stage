<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actualite;
use App\Http\Resources\ActualiteResource;
use Illuminate\Http\Request;

class ActualiteController extends Controller
{
    public function index(Request $request)
    {
        $query = Actualite::published()->orderBy('date_publication', 'desc');

        if ($request->filled('categorie') && $request->categorie !== 'Tous') {
            $query->where('categorie', $request->categorie);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('titre_fr', 'like', "%{$search}%")
                  ->orWhere('titre_ar', 'like', "%{$search}%");
            });
        }

        $actualites = $query->paginate(12);

        return ActualiteResource::collection($actualites);
    }

    public function show($slug)
    {
        $actualite = Actualite::where('slug', $slug)->published()->firstOrFail();
        
        // Optionnel: Incrémenter les vues ici si une colonne existe
        
        return new ActualiteResource($actualite);
    }
}
