<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Contrôleurs
use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\ProgrammeController;
// use App\Http\Controllers\Api\PublicationController; // (A générer)
use App\Http\Controllers\Api\StatistiqueController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function() {
    
    // --- Publiques ---
    Route::get('actualites', [ActualiteController::class, 'index']);
    Route::get('actualites/{slug}', [ActualiteController::class, 'show']);
    
    Route::get('programmes', [ProgrammeController::class, 'index']);
    Route::get('programmes/{slug}', [ProgrammeController::class, 'show']);
    
    Route::get('publications', [PublicationController::class, 'index']);
    Route::get('publications/{slug}', [PublicationController::class, 'show']);
    
    Route::get('statistiques', [StatistiqueController::class, 'index']);
    
    // Route::get('partenaires', [PartenairesController::class, 'index']);
    
    Route::post('contact', [ContactController::class, 'store']);

    // --- Auth ---
    Route::post('auth/login', [AuthController::class, 'login']);

    // --- Admin (protégées via Sanctum) ---
    Route::middleware('auth:sanctum')->prefix('admin')->group(function() {
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::get('auth/me', function (Request $request) { return $request->user(); });

        // Route::apiResource('actualites', ActualiteAdminController::class)->except(['index','show']);
        // Route::apiResource('programmes', ProgrammeAdminController::class)->except(['index','show']);
        Route::put('statistiques/{id}', [StatistiqueController::class, 'update']);
    });
});
