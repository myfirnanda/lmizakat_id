<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminPostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $title = "Daftar Postingan";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        if (Gate::allows('superadmin') || Gate::allows('admin')) {
            $posts = Post::with("postCategory", "user")
                    ->latest()
                    ->get();
        } elseif (Gate::allows('writer')) {
            $posts = Post::with("postCategory", "user")
                    ->where('user_id', auth()->user()->id)
                    ->latest()
                    ->get();
        } else {
            $posts = collect();
        }

        return Inertia::render('AdminPost', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "postingan",
                "child" => "",
                "isParent" => true,
            ],
            "posts" => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = "Tambah Postingan";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $categories = PostCategory::where('language', 'id')->get();

        return Inertia::render('AdminPostCreate', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "postingan",
                "child" => "tambah Postingan",
                "isParent" => false,
            ],
            "categories" => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "image" => "file|image|max:1024|required",
            "title" => "required",
            "language" => "required",
            "category_id" => "required",
            "body" => "required",
        ]);
        $validatedData["date"] = now();
        $validatedData["is_featured"] = $request->is_featured;
        $validatedData["is_choice"] = $request->is_choice;
        $validatedData["user_id"] = auth()->user()->id;

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('posts-image');
        }

        $slug = Str::slug($validatedData['title'], '-');
        $slugTitle = $slug;
        $count = 2;

        while (Post::where('slug', $slug)->exists()) {
            $slug = $slugTitle . '-' . $count;
            $count++;
        }
        $validatedData['slug'] = $slug;

        $post = Post::create($validatedData);

        return redirect()->route('admin.posts.index')->with('success', 'Berhasil Menambahkan Postingan');
    }


    /**
     * Display the specified resource.
     */
    public function show(Post $post, $slug)
    {
        $title = "Detail Postingan";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $post = Post::with('postCategory', 'user')
                    ->where('slug', $slug)
                    ->firstOrFail();

        return Inertia::render('AdminPostDetail', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "postingan",
                "child" => "detail postingan",
                "isParent" => false,
            ],
            "post" => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, $slug)
    {
        $title = "Edit Postingan";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $post = Post::where('slug', $slug)->firstOrFail();

        return Inertia::render('AdminPostEdit', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "postingan",
                "child" => "edit postingan",
                "isParent" => false,
            ],
            "post" => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post = Post::findOrFail($request->id);
        $validatedData = $request->validate([
            "title" => "required",
            "language" => "required",
            "category_id" => "required",
            "body" => "required",
        ]);
        $validatedData["is_featured"] = $request->is_featured;
        $validatedData["is_choice"] = $request->is_choice;

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::delete($post->image);
            }
            $validatedData['image'] = $request->file('image')->store('posts-image');
        }

        if ($validatedData['title'] !== $post->title) {
            $slug = Str::slug($validatedData['title'], '-');
            $slugTitle = $slug;
            $count = 2;

            while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                $slug = $slugTitle . '-' . $count;
                $count++;
            }
            $validatedData['slug'] = $slug;
        }

        $post->update($validatedData);

        return redirect()->route('admin.posts.index')->with('success', 'Berhasil Memperbarui Postingan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        Storage::delete($post->image);

        return redirect()->route('admin.posts.index')->with('success', 'Berhasil Menghapus Postingan');
    }

    public function setCategory($lang) {
        $categories = PostCategory::where('language', $lang)->get();
        return response()->json($categories);
    }
}
