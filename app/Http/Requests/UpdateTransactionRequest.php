<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supplier_code' => 'required|string|max:255',
            'supplier_in' => 'nullable|date',
            'supplier_startBongkarMuat' => 'nullable|date',
            'supplier_selesaiBongkarMuat' => 'nullable|date',
            'supplier_out' => 'nullable|date',
        ];
    }
}
