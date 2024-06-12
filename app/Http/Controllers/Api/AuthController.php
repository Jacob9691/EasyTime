<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Invalid login details'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        try {
            // Attempt to create the user
            /** @var User $user */
            $user = User::query()->create([
                'surname' => $data['surname'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'company_number' => $data['company_number'],
                'password' => bcrypt($data['password'])
            ]);

            // Check if user creation was successful
            if ($user) {
                $user = $user->fresh();

                // Create token for the new user
                $token = $user->createToken('main')->plainTextToken;

                return response()->json(compact('user', 'token'));
            } else {
                return response()->json(['message' => 'User creation failed'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during signup', 'error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
