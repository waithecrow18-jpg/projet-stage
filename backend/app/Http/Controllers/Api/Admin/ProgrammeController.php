<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Programme;
use Illuminate\Support\Str;

class ProgrammeController extends Controller
{
    public function index(Request $request)
    {
        $query = Programme::orderBy('created_at', 'desc');
        if ($request->filled('search')) {
            $query->where('nom_fr', 'like', "%{$request->search}%");
        }
        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $data = $request->except(['icone']);
        $data['slug'] = Str::slug($request->nom_fr) . '-' . time();

        if ($request->hasFile('icone')) {
            $data['icone'] = '/storage/' . $request->file('icone')->store('programmes', 'public');
        }

        $programme = Programme::create($data);
        return response()->json($programme, 201);
    }

    public function show($id)
    {
        return response()->json(Programme::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $programme = Programme::findOrFail($id);
        $data = $request->except(['icone', '_method']);

        if ($request->hasFile('icone')) {
            $data['icone'] = '/storage/' . $request->file('icone')->store('programmes', 'public');
        }

        $programme->update($data);
        return response()->json($programme);
    }

    public function destroy($id)
    {
        Programme::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
