<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'required|string|min:5|max:200',
            'message' => 'required|string|min:20',
        ]);

        // Simuler la sauvegarde en DB / Envoi de mail
        Log::info('Nouveau message de contact : ' . $validated['email']);

        // Optionnellement: 
        // Mail::to('contact@environnement.gov.ma')->send(new ContactMail($validated));

        return response()->json([
            'success' => true,
            'message' => 'Votre message a bien été envoyé. Nous vous répondrons sous peu.'
        ], 200);
    }
}
