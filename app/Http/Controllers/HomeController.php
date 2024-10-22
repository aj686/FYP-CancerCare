<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render("Homepage");
    }

    public function cancerInformation() {
        return Inertia::render("CancerInformation");
    }

    public function getInvolved() {
        return Inertia::render("GetInvolved");
    }

    public function ourResearch() {
        return Inertia::render("OurResearch");
    }

    public function about() {
        return Inertia::render("About");
    }
}
