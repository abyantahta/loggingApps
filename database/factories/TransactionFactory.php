<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supplier_code' => fake()->unique()->randomNumber(6, true),
            // 'supplier_name' => fake()->name(),
            'supplier_in' => fake()->dateTime(),
            'supplier_startBongkarMuat' => fake()->dateTime(),
            'supplier_selesaiBongkarMuat' => fake()->dateTime(),
            'supplier_out' => fake()->dateTime(),
            //
        ];
    }
}
