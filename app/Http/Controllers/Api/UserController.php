<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function updateUser(UpdateUserRequest $request): JsonResponse
    {
        // Find brugeren baseret på ID
        $user = User::query()->find($request->input('id'));

        // Tjek om brugeren findes
        if (!$user) {
            return response()->json(['message' => 'Bruger ikke fundet'], 404);
        }

        // Opdater brugerens data
        $user->surname = $request->input('surname');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        $user->address = $request->input('address');
        $user->phone = $request->input('phone');

        // Gem brugeren med de opdaterede oplysninger
        $user->save();

        // Returner en succesmeddelelse og brugeroplysningerne som JSON respons
        return response()->json(['message' => 'Bruger opdateret succesfuldt', 'user' => $user]);
    }

    public function getUsers($companyNumber): JsonResponse
    {
        // Hent alle brugere tilhørende det angivne virksomhedsnummer
        $users = User::query()->where('company_number', $companyNumber)->get();

        // Hvis der ikke findes nogen brugere for det angivne virksomhedsnummer, returneres en fejlmeddelelse med statuskode 404 (Not Found)
        if ($users->isEmpty()) {
            return response()->json(['message' => 'Ingen brugere fundet for dette virksomhedsnummer'], 404);
        }

        // Returner brugerne som JSON respons
        return response()->json($users);
    }
}
