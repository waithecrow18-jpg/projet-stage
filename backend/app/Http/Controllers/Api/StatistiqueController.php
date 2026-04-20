<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Statistique;
use Illuminate\Http\Request;

class StatistiqueController extends Controller
{
    public function index()
    {
        $stats = Statistique::all();
        // Pas de JsonResource particulier, un simple format clé/valeur convient
        return response()->json($stats);
    }

    public function update($id, Request $request)
    {
        $stat = Statistique::findOrFail($id);
        
        $validated = $request->validate([
            'valeur' => 'required|string|max:255',
        ]);

        $stat->update($validated);

        return response()->json([
            'message' => 'Statistique mise à jour avec succès.',
            'data' => $stat
        ]);
    }
}
