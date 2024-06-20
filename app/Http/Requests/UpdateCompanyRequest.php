<?php

namespace App\Http\Requests;

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|exists:users,id',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:company,email,' . $this->id,
            'address' => 'nullable|string|max:255',
            'phone' => 'required|numeric|digits:8'
        ];
    }
}

