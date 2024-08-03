<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class AdminCategoriesController extends Controller
{
    public function index()
    {
        $title = "Daftar Kategori";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $categories = PostCategory::all();

        return Inertia::render('AdminCategory', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "kategori",
                "child" => "",
                "isParent" => true,
            ],
            "categories" => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = "Tambah Kategori";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        return Inertia::render('AdminCategoryCreate', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "kategori",
                "child" => "tambah kategori",
                "isParent" => false,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required",
            "language" => "required",
        ]);

        $slug = Str::slug($validatedData["name"], '-');
        $slugTitle = $slug;
        $count = 2;

        while (PostCategory::where('slug', $slug)->exists()) {
            $slug = $slugTitle . '-' . $count;
            $count++;
        }
        $validatedData['slug'] = $slug;

        PostCategory::create([
            "name" => $validatedData["name"],
            "slug" => $slug,
            "language" => $validatedData["language"],
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Berhasil Menambahkan Kategori');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Category $category)
    // {
    //     $title = "Detail Kategori";
    //     $can = [
    //         'superadmin' => Gate::allows('superadmin'),
    //         'admin' => Gate::allows('admin'),
    //         'writer' => Gate::allows('writer'),
    //         'publisher' => Gate::allows('publisher')
    //     ];
    //     $category = PostCategory::where('slug', $slug)->firstOrFail();

    //     return Inertia::render('AdminCategoryDetail', [
    //         "title" => $title,
    //         "can" => $can,
    //         "breadcrumb" => [
    //             "mainRoute" => "admin.categories.index",
    //             "parent" => "kategori",
    //             "child" => "detail kategori",
    //             "isParent" => false,
    //         ],
    //         "category" => $category,
    //     ]);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostCategory $category, $slug)
    {
        $title = "Edit Kategori";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $category = PostCategory::where('slug', $slug)->firstOrFail();

        return Inertia::render('AdminCategoryEdit', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.categories.index",
                "parent" => "kategori",
                "child" => "edit kategori",
                "isParent" => false,
            ],
            "category" => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostCategory $category)
    {
        $category = PostCategory::findOrFail($request->id);

        $validatedData = $request->validate([
            "name" => "required",
            "language" => "required",
        ]);

        $slug = Str::slug($validatedData["name"], '-');

        $category->name = $validatedData["name"];
        $category->slug = $slug;
        $category->language = $validatedData["language"];

        $category->save();

        return redirect()->route('admin.categories.index')->with('success', 'Berhasil Memperbarui Kategori');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostCategory $category, $slug)
    {
        try {
            $category = PostCategory::where('slug', $slug)->firstOrFail();
            $category->delete();
            return redirect()->route('admin.categories.index')->with('success', 'Berhasil Menghapus Kategori');
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
    }
}
