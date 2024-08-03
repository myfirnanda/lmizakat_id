<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Magazine;
use App\Http\Requests\StoreMagazineRequest;
use App\Http\Requests\UpdateMagazineRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use App\Models\PostCategory;

class MagazineController extends Controller
{
    public function setLocalization($lang)
    {
        if (in_array($lang, ["id", "en"])) {
            App::setLocale($lang);
            Session::put("locale", $lang);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index($lang)
    {
        $this->setLocalization($lang);

            $title = $lang === "id" ? "Semua Majalah" : "All Magazines";

            // $categories = PostCategory::all();
            $categories = PostCategory::where("language", $lang)->get();

            $magazines = Magazine::where("language", $lang)
                                ->latest()->get();

            if (request("year")) {
                $year = request("year");
                $magazines->whereYear('release', $year);
            }

            return Inertia::render("Magazines", [
                "title" => $title,
                "categories" => $categories,
                "magazines" => $magazines,
            ]);
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
    public function store(StoreMagazineRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($lang, $slug)
    {
        $this->setLocalization($lang);

        $title = $lang === "id" ? "Detail Majalah" : "Show Magazines";

        $magazine = Magazine::with("user")
                    ->where("slug", $slug)
                    ->where("language", $lang)
                    ->firstOrFail();

        $categories = PostCategory::where("language", $lang)->get();

        $sessionKey = 'magazine_view_' . $magazine->slug;
        $cooldownTime = 5 * 60; // 5 minutes in seconds

        if (!session()->has($sessionKey) || (time() - session($sessionKey)) > $cooldownTime) {
            $magazine->increment('views');
            session([$sessionKey => time()]);
        }

        return Inertia::render("Magazine", [
            "title" => $title,
            "categories" => $categories,
            // "post" => $post,
            // "popularPosts" => $popularPosts,
            // "relatedPosts" => $relatedPosts,
            "magazine" => $magazine
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Magazine $magazine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMagazineRequest $request, Magazine $magazine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Magazine $magazine)
    {
        //
    }
}
