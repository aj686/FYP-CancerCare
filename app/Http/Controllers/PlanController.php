<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PlanController extends Controller
{
    public function index() {
        try {
            $plans = Plan::all();
            
            if(Auth::check()) {
                $user = Auth::user();
                // Fix: Change membership() to membership to get the actual relationship data
                $activeMembership = $user->membership; 
                
                return Inertia::render('Plan', [
                    'plans' => $plans,
                    'isGuest' => false,
                    'activeMembership' => $activeMembership ? [
                        'plan_id' => $activeMembership->plan_id,
                        'end_date' => $activeMembership->end_date,
                        'status' => $activeMembership->status
                    ] : null,
                ]);
            } else {
                return Inertia::render('Guest/Plan', [
                    'plans' => $plans,
                    'isGuest' => true,
                    'activeMembership' => null,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Plan page error: ' . $e->getMessage());
            
            return Inertia::render('Plan', [
                'plans' => [],
                'isGuest' => !Auth::check(),
                'activeMembership' => null,
            ]);
        }
    }
}
