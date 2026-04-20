<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Contrôleurs
use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\ProgrammeController;
use App\Http\Controllers\Api\PublicationController;
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

        Route::apiResource('actualites', \App\Http\Controllers\Api\Admin\ActualiteController::class);
        Route::apiResource('programmes', \App\Http\Controllers\Api\Admin\ProgrammeController::class);
        Route::apiResource('publications', \App\Http\Controllers\Api\Admin\PublicationController::class);
        
        Route::get('statistiques', [StatistiqueController::class, 'index']);
        Route::put('statistiques/{id}', [StatistiqueController::class, 'update']);
    });
});
