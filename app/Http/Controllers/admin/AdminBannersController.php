<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class AdminBannersController extends Controller
{
    public function generateShortUID() {
        $randomHex = substr(md5(rand()), 0, 6);
        $decimalNumber = base_convert($randomHex, 16, 10);
        $shortUUID = str_pad($decimalNumber, 8, '0', STR_PAD_LEFT);
        return $shortUUID;
    }

    public function index()
    {
        $title = "Daftar Spanduk";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $banners = Banner::latest()->get();

        return Inertia::render('AdminBanner', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "spanduk",
                "child" => "",
                "isParent" => true,
            ],
            "banners" => $banners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = "Tambah Spanduk";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        return Inertia::render('AdminBannerCreate', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "spanduk",
                "child" => "tambah spanduk",
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
            "image" => "file|image|max:3072|required",
            "link" => "required",
            "language" => "required",
        ]);
        $validatedData["id"] = $this->generateShortUID();
        $validatedData["title"] = $request->title;
        $validatedData["user_id"] = auth()->user()->id;

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('banners-image');
        }

        Banner::create($validatedData);

        return redirect()->route('admin.banners.index')->with('success', 'Berhasil Menambahkan Spanduk');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Banner $banner)
    // {
    //     $title = "Detail Spanduk";
    //     $can = [
    //         'superadmin' => Gate::allows('superadmin'),
    //         'admin' => Gate::allows('admin'),
    //         'writer' => Gate::allows('writer'),
    //         'publisher' => Gate::allows('publisher')
    //     ];

    //     return Inertia::render('', [
    //         "title" => $title,
    //         "can" => $can,
    //         "breadcrumb" => [
    //             "mainRoute" => "admin.posts.index",
    //             "parent" => "spanduk",
    //             "child" => "detail spanduk",
    //             "isParent" => false,
    //         ],
    //     ]);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner, $id)
    {
        $title = "Edit Spanduk";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $banner = Banner::findOrFail($id);

        return Inertia::render('AdminBannerEdit', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.posts.index",
                "parent" => "spanduk",
                "child" => "edit spanduk",
                "isParent" => false,
            ],
            "banner" => $banner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $banner = Banner::findOrFail($request->id);

        $validatedData = $request->validate([
            "link" => "required",
            "language" => "required",
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::delete($banner->image);
            }
            $validatedData['image'] = $request->file('image')->store('banners-image');
            $banner->image = $validatedData["image"];
        }

        $banner->link = $validatedData["link"];
        $banner->language = $validatedData["language"];
        $banner->title = $request->title;
        $banner->user_id = auth()->user()->id;

        $banner->save();

        return redirect()->route('admin.banners.index')->with('success', 'Berhasil Memperbarui Spanduk');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner, $id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $banner->delete();
            Storage::delete($banner->image);
            return redirect()->route('admin.banners.index')->with('success', 'Berhasil Menghapus Spanduk');
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
    }
}
