<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Programme;
use App\Http\Resources\ProgrammeResource;
use Illuminate\Http\Request;

class ProgrammeController extends Controller
{
    public function index()
    {
        $programmes = Programme::orderBy('annee_lancement', 'desc')->get();
        return ProgrammeResource::collection($programmes);
    }

    public function show($slug)
    {
        $programme = Programme::where('slug', $slug)->firstOrFail();
        return new ProgrammeResource($programme);
    }
}
