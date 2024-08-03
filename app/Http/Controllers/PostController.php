<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Post;
use App\Models\PostCategory;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    public function setLocalization($lang)
    {
        if (in_array($lang, ["id", "en"])) {
            App::setLocale($lang, "id");
            Session::put("locale", $lang);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index($lang)
    {
        if (!in_array($lang, ["id", "en"])) {
            return redirect("/")->withErrors("Unsupported language selected.");
        }

        try {
            // dd(request("search") !== null);
            $this->setLocalization($lang);

            $title = $lang === "id" ? "Semua Postingan" : "All Posts";

            $categories = PostCategory::where("language", $lang)
                                        ->get();

            $banners = Banner::where("language", $lang)
                                ->latest()
                                ->get();

            $latestPosts = Post::with("postCategory", "user")
                        ->where("language", $lang)
                        // ->where("is_featured", false)
                        ->latest();

            if (request("search")) {
                $latestPosts->where("title", "like", "%" . request("search") . "%")
                        ->orWhere("body", "like", "%" . request("search") . "%");
                        // ->where("language", $lang);
            }

            // $popularPostsBanner = Post::with("postCategory", "user")
            //                         ->where("language", $lang)
            //                         ->orderBy("views", "desc")
            //                         ->take(3)
            //                         ->get();

            $featuredPosts = Post::with("postCategory", "user")
                                ->where("language", $lang)
                                ->where("is_featured", true)
                                ->orderBy("views", "desc")
                                ->take(7)
                                ->get();

            $choicePost = Post::with("postCategory", "user")
                                ->where("language", $lang)
                                ->where("is_choice", true)
                                ->inRandomOrder()
                                ->first();

            $highlightPosts = Post::with("postCategory", "user")
                                    ->where("language", $lang)
                                    // ->orderBy("views", "desc")
                                    ->take(6)
                                    ->get();

            $popularPosts = Post::with("postCategory", "user")
                                ->where("language", $lang)
                                ->where("is_featured", false)
                                ->orderBy("views", "desc")
                                ->take(7)
                                ->get();

            return Inertia::render("Posts", [
                "title" => $title,
                "banners" => $banners,
                "categories" => $categories,
                "featuredPosts" => $featuredPosts,
                "choicePost" => $choicePost,
                "highlightPosts" => $highlightPosts,
                "latestPosts" => $latestPosts->paginate(7)->withQueryString(),
                "popularPosts" => $popularPosts,
                // "popularPostsBanner" => $popularPostsBanner,
            ]);
        } catch (\Exception $e) {
            \Log::error("Failed to fetch posts: " . $e->getMessage());
            return back()->withErrors("Failed to load posts.");
        }
        // return view("posts", [
        //     "categories" => $categories,
        //     "latestPosts" => $latestPosts
        // ]);
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
    public function store(StorePostRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($lang, $slug)
    {
        $title = $lang === "id" ? "Detail Postingan" : "Post Detail";

        $categories = PostCategory::where("language", $lang)->get();

        $post = Post::with("postCategory", "user")
                    ->where("slug", $slug)
                    ->where("language", $lang)
                    ->firstOrFail();

        $popularPosts = Post::with("postCategory", "user")
                            ->where("language", $lang)
                            ->orderBy("views", "desc")
                            ->take(7)
                            ->get();

        $relatedPosts = Post::with("postCategory", "user")
                            ->where("language", $lang)
                            ->where("category_id", $post->category_id)
                            ->inRandomOrder()
                            ->take(3)
                            ->get();

        $this->setLocalization($lang);

        $sessionKey = 'post_view_' . $post->slug;
        $cooldownTime = 5 * 60; // 5 minutes in seconds

        if (!session()->has($sessionKey) || (time() - session($sessionKey)) > $cooldownTime) {
            $post->increment('views');
            session([$sessionKey => time()]);
        }

        return Inertia::render("Post", [
            "title" => $title,
            "post" => $post,
            "popularPosts" => $popularPosts,
            "relatedPosts" => $relatedPosts,
            "categories" => $categories,
        ]);

        // return Inertia::render("Post");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
