<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events', [EventController::class, 'store']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

Route::post('/updateUser', [UserController::class, 'updateUser']);
Route::get('/users/{companyNumber}', [UserController::class, 'getUsers']);

Route::post('/companyRegister', [CompanyController::class, 'register']);
Route::get('/company/{companyNumber}', [CompanyController::class, 'getCompany']);
Route::post('/updateCompany', [CompanyController::class, 'updateCompany']);
