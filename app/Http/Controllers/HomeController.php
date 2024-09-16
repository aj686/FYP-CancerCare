<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render("Homepage");
    }

    public function cancer() {
        return Inertia::render("Cancer");
    }

    public function getInvolved() {
        return Inertia::render("GetInvolved");
    }

    public function ourResearch() {
        return Inertia::render("OurResearch");
    }

    public function event() {
        return Inertia::render("Event");
    }

    public function shop() {
        return Inertia::render("Shop");
    }

    public function about() {
        return Inertia::render("About");
    }
}
