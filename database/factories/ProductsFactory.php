<?php

namespace Database\Factories;

use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{   

    // link Products with ProductsFactory
    protected $model = Products::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     
    public function definition(): array 
    {
        $productName = $this->faker->words(3, true); // Generate a random product name

        return [
            'name' => $productName,
            'slug' => Str::slug($productName), // Generate slug from name
            'description' => $this->faker->sentence(), // Random sentence for description
            'price' => $this->faker->randomFloat(2, 10, 1000), // Price between 10.00 and 1000.00
            'stock_quantity' => $this->faker->numberBetween(0, 100), // Stock between 0 and 100
            'image' => 'products/' . $this->faker->image('public/storage/products', 640, 480, null, false), // Store image in public path
        ];
    }
}
