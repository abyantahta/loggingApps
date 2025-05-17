<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArrivalRule>
 */
class ArrivalRuleFactory extends Factory
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
            'jam_kedatangan' => fake()->time(),
            'rit' => rand(0,2),
            'durasi_bongkar' =>70
            //
        ];
    }
}
