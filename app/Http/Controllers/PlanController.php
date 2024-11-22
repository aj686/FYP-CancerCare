<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index() {
        $plans = Plan::all();

        return Inertia::render('Plan', [
            'plans' => $plans,
        ]);
    }
}
