<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CancerController extends Controller
{   
    public function aboutCancer() {
        return Inertia::render("CancerPages/AboutCancer");
    }
    
    public function cancerTypes() {
        return Inertia::render("CancerPages/CancerTypes");
    }

    public function treatments() {
        return Inertia::render("CancerPages/Treatments");
    }

    public function prevention() {
        return Inertia::render("CancerPages/Prevention");
    }

    public function detection() {
        return Inertia::render("CancerPages/Detection");
    }

    public function recovery() {
        return Inertia::render("CancerPages/Recovery");
    }

    public function diagnosis() {
        return Inertia::render("CancerPages/Diagnosis");
    }
}
