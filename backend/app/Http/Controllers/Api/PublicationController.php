<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use App\Http\Resources\PublicationResource;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Publication::query()->orderBy('date_publication', 'desc');

        if ($request->filled('type') && $request->type !== 'Tous') {
            $query->where('categorie', $request->type);
        }

        $publications = $query->paginate(12);

        return PublicationResource::collection($publications);
    }

    public function show($slug)
    {
        $publication = Publication::where('slug', $slug)->firstOrFail();
        return new PublicationResource($publication);
    }
}
