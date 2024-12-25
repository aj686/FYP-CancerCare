<?php

namespace App\Http\Controllers;

use App\Models\CommunityGroup;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index()
    {
        // Check membership
        if (!Auth::user()->membership) {
            return redirect()->route('plan.index')
                ->with('error', 'This feature is for members only');
        }

        $groups = CommunityGroup::where('is_active', true)->get();

        return Inertia::render('Community/Index', [
            'groups' => $groups
        ]);
    }
}
