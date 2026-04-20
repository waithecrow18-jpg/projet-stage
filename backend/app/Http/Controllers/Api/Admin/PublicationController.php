<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Publication;
use Illuminate\Support\Str;

class PublicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Publication::orderBy('created_at', 'desc');
        if ($request->filled('search')) {
            $query->where('titre_fr', 'like', "%{$request->search}%");
        }
        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $data = $request->except(['fichier_pdf']);
        $data['slug'] = Str::slug($request->titre_fr) . '-' . time();

        if ($request->hasFile('fichier_pdf')) {
            $data['fichier_pdf'] = '/storage/' . $request->file('fichier_pdf')->store('publications', 'public');
        }

        $publication = Publication::create($data);
        return response()->json($publication, 201);
    }

    public function show($id)
    {
        return response()->json(Publication::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);
        $data = $request->except(['fichier_pdf', '_method']);

        if ($request->hasFile('fichier_pdf')) {
            $data['fichier_pdf'] = '/storage/' . $request->file('fichier_pdf')->store('publications', 'public');
        }

        $publication->update($data);
        return response()->json($publication);
    }

    public function destroy($id)
    {
        Publication::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
