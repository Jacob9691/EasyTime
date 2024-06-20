<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        // Opret et nyt firma baseret på de modtagne oplysninger
        $company = Company::query()->create([
            'company_name' => $request['company_name'],
            'email' => $request['email'],
            'address' => $request['address'],
            'phone' => $request['phone'],
        ]);

        // Returner firmaoplysningerne som JSON respons med statuskode 201 (Created)
        return response()->json($company, 201);
    }

    public function getCompany(int $companyNumber): JsonResponse
    {
        // Find firmaet med det angivne virksomhedsnummer
        $company = Company::query()->where('id', $companyNumber)->first();

        // Hvis firmaet ikke findes, returneres en fejlmeddelelse med statuskode 404 (Not Found)
        if (!$company) {
            return response()->json(['error' => 'Firma ikke fundet'], 404);
        }

        // Returner firmaoplysningerne som JSON respons
        return response()->json($company);
    }

    public function updateCompany(UpdateCompanyRequest $request): JsonResponse
    {
        // Find firmaet baseret på det angivne ID
        $company = Company::query()->find($request->input('id'));

        // Hvis firmaet ikke findes, returneres en fejlmeddelelse med statuskode 404 (Not Found)
        if (!$company) {
            return response()->json(['message' => 'Firma ikke fundet'], 404);
        }

        // Opdater firmaets oplysninger med de modtagne oplysninger
        $company->company_name = $request->input('company_name');
        $company->email = $request->input('email');
        $company->address = $request->input('address');
        $company->phone = $request->input('phone');

        // Gem firmaet med de opdaterede oplysninger
        $company->save();

        // Returner en succesmeddelelse og firmaoplysningerne som JSON respons
        return response()->json(['message' => 'Firma opdateret succesfuldt', 'company' => $company]);
    }
}
