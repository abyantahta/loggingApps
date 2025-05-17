<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTransactionRequest extends FormRequest
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
            'supplier_code' => [
                'required',
                'string',
                'max:255',
                Rule::exists('suppliers', 'supplier_code')
            ],
            'supplier_in' => 'required|date',
            'supplier_startBongkarMuat' => 'nullable|date',
            'supplier_selesaiBongkarMuat' => 'nullable|date',
            'supplier_out' => 'nullable|date',

            //            $table->id();
            // $table->string('supplier_code');
            // $table->foreign('supplier_code')->references('supplier_code')->on('suppliers');
            // $table->timestamp('supplier_in');
            // $table->timestamp('supplier_startBongkarMuat')->nullable();
            // $table->timestamp('supplier_selesaiBongkarMuat')->nullable();
            // $table->timestamp('supplier_out')->nullable();
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'supplier_code.exists' => 'Kode supplier tidak ditemukan dalam database.',
        ];
    }
}
