<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        /**@var \App\Models\User $user */
        $user = User::created([
            'surname' => $data['surname'],
            'lastName' => $data['last_name'],
            'email' => $data['email'],
            'company' => $data['company_number'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('token')->accessToken;
    }

    public function signup(SignupRequest $request)
    {

    }

    public function logout(Request $request)
    {

    }
}
