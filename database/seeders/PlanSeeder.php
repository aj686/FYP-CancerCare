<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Monthly Membership',
                'slug' => 'monthly-membership',
                'stripe_plan' => 'price_1QNG2wC6Q3EdzBqP1jUOv11M',
                'price' => 25,
                'description' => 'Monthly membership plan',
            ]
        ];
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
