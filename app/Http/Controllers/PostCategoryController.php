<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Post;
use App\Models\PostCategory;
use App\Http\Requests\StorePostCategoryRequest;
use App\Http\Requests\UpdatePostCategoryRequest;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($lang, $slug)
    {
        $categories = PostCategory::where('language', $lang)->get();

        $category = PostCategory::where('slug', $slug)->where('language', $lang)->first();

        $posts = $category
                    ->posts()
                    ->with('user', 'postCategory')
                    ->where('language', $lang)
                    ->latest()
                    ->paginate(7);

        $popularPosts = Post::with('postCategory', 'user')
                    ->where('language', $lang)
                    ->orderBy('views', 'desc')
                    ->take(7)
                    ->get();

        $latestPosts = Post::with("postCategory", "user")
                    ->where("language", $lang)
                    ->where("category_id", $category->id)
                    ->latest()->paginate(7)->withQueryString();
        // dd($latestPosts);

        return Inertia::render('Category', [
            "title" => "Kategori Postingan : " . ucfirst($slug),
            "categories" => $categories,
            "category" => $category,
            "posts" => $posts,
            "popularPosts" => $popularPosts,
            "latestPosts" => $latestPosts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostCategory $postCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostCategoryRequest $request, PostCategory $postCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostCategory $postCategory)
    {
        //
    }
}
