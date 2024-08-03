<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Models\Post;
use App\Models\Magazine;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $title = "Admin Dashboard";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $posts = Post::all();
        $magazines = Magazine::all();
        $dashboardMagazines = Magazine::with('user')->latest()->take(10)->get();
        $dashboardPosts = Post::with('user')->latest()->take(10)->get();

        return Inertia::render('AdminDashboard', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "Dashboard",
                "child" => "",
                "isParent" => true,
            ],
            "posts" => $posts,
            "magazines" => $magazines,
            "dashboardPosts" => $dashboardPosts,
            "dashboardMagazines" => $dashboardMagazines,
        ]);
    }
}
