<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Company;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        // Valider indkommende data baseret på LoginRequest regler
        $credentials = $request->validated();

        // Forsøg at logge ind brugeren med de givne legitimationsoplysninger
        if (!Auth::attempt($credentials)) {
            // Returner fejlbesked, hvis login mislykkedes
            return response([
                'message' => 'Forkert email eller adgangskode'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        // Opret en autentifikationstoken for brugeren
        $token = $user->createToken('main')->plainTextToken;

        // Returner brugeroplysninger og token som svar
        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request)
    {
        // Valider indkommende data baseret på SignupRequest regler
        $data = $request->validated();

        // Tjek om der allerede findes brugere med det samme virksomhedsnummer
        $usersWithCompanyNumber = User::query()->where('company_number', $data['company_number'])->exists();

        /** @var User $user */
        // Opret en ny bruger i databasen
        $user = User::query()->create([
            'surname' => $data['surname'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'company_number' => $data['company_number'],
            'password' => bcrypt($data['password']),
            'admin' => !$usersWithCompanyNumber // Gør brugeren til admin, hvis der ikke findes andre med samme virksomhedsnummer
        ]);

        // Opret en autentifikationstoken for den nye bruger
        $token = $user->createToken('main')->plainTextToken;

        // Returner brugeroplysninger og token som svar
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        // Hent den aktuelle bruger
        $user = $request->user();

        // Slet den aktuelle adgangstoken for brugeren (logout)
        $user->currentAccessToken()->delete();

        // Returner en tom respons med statuskode 204
        return response('', 204);
    }
}
