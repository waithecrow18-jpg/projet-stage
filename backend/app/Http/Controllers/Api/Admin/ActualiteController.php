<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Actualite;
use Illuminate\Support\Str;

class ActualiteController extends Controller
{
    public function index(Request $request)
    {
        $query = Actualite::orderBy('created_at', 'desc');
        if ($request->filled('search')) {
            $query->where('titre_fr', 'like', "%{$request->search}%");
        }
        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $data = $request->except(['image']);
        $data['slug'] = Str::slug($request->titre_fr) . '-' . time();
        $data['is_published'] = filter_var($request->is_published, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('actualites', 'public');
        }

        $actualite = Actualite::create($data);
        return response()->json($actualite, 201);
    }

    public function show($id)
    {
        return response()->json(Actualite::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $actualite = Actualite::findOrFail($id);
        $data = $request->except(['image', '_method']);
        
        if ($request->has('is_published')) {
            $data['is_published'] = filter_var($request->is_published, FILTER_VALIDATE_BOOLEAN);
        }

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('actualites', 'public');
        }

        $actualite->update($data);
        return response()->json($actualite);
    }

    public function destroy($id)
    {
        Actualite::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
