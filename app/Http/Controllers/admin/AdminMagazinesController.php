<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Magazine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminMagazinesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $title = "Daftar Majalah";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        if (Gate::allows('superadmin') || Gate::allows('admin')) {
            $magazines = Magazine::with("user")
                    ->latest()
                    ->get();
        } elseif (Gate::allows('publisher')) {
            $magazines = Magazine::with("user")
                    ->where('user_id', auth()->user()->id)
                    ->latest()
                    ->get();
        } else {
            $magazines = collect();
        }

        return Inertia::render('AdminMagazine', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "majalah",
                "child" => "",
                "isParent" => true,
            ],
            "magazines" => $magazines,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = "Tambah Majalah";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        if (Gate::allows('superadmin') || Gate::allows('admin')) {
            $magazines = Magazine::with("user")
                    ->latest()
                    ->get();
        } elseif (Gate::allows('writer')) {
            $magazines = Magazine::with("user")
                    ->where('user_id', auth()->user()->id)
                    ->latest()
                    ->get();
        } else {
            $magazines = collect();
        }

        return Inertia::render('AdminMagazineCreate', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.magazines.index",
                "parent" => "majalah",
                "child" => "tambah majalah",
                "isParent" => false,
            ],
            "magazines" => $magazines,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "title" => "required",
            "language" => "required",
            "link" => "required",
            "description" => "required"
        ]);
        $validatedData["release"] = date("Ymd", strtotime(now()));;
        $validatedData["user_id"] = auth()->user()->id;

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('magazines-image');
        }

        $slug = Str::slug($validatedData['title'], '-');
        $slugTitle = $slug;
        $count = 2;

        while (Magazine::where('slug', $slug)->exists()) {
            $slug = $slugTitle . '-' . $count;
            $count++;
        }
        $validatedData['slug'] = $slug;

        Magazine::create($validatedData);

        return redirect()->route('admin.magazines.index')->with('success', 'Berhasil Menambahkan Majalah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Magazine $magazine, $slug)
    {
        $title = "Detail Majalah";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $magazine = Magazine::where('slug', $slug)->firstOrFail();

        return Inertia::render('AdminMagazineDetail', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.magazines.index",
                "parent" => "majalah",
                "child" => "detail majalah",
                "isParent" => false,
            ],
            "magazine" => $magazine,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Magazine $magazine, $slug)
    {
        $title = "Daftar Majalah";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $magazine = Magazine::where('slug', $slug)->firstOrFail();

        return Inertia::render('AdminMagazineEdit', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.magazines.index",
                "parent" => "majalah",
                "child" => "edit majalah",
                "isParent" => false,
            ],
            "magazine" => $magazine,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Magazine $magazine)
    {
        $magazine = Magazine::findOrFail($request->id);
        $validatedData = $request->validate([
            "title" => "required",
            "language" => "required",
            "link" => "required",
            "description" => "required"
        ]);

        if ($request->hasFile('image')) {
            if ($magazine->image) {
                Storage::delete($magazine->image);
            }
            $validatedData['image'] = $request->file('image')->store('magazines-image');
        }

        if ($validatedData['title'] !== $magazine->title) {
            $slug = Str::slug($validatedData['title'], '-');
            $slugTitle = $slug;
            $count = 2;

            while (Magazine::where('slug', $slug)->where('id', '!=', $magazine->id)->exists()) {
                $slug = $slugTitle . '-' . $count;
                $count++;
            }
            $validatedData['slug'] = $slug;
        }

        $magazine->update($validatedData);

        return redirect()->route('admin.magazines.index')->with('success', 'Berhasil Memperbarui Majalah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Magazine $magazine, $id)
    {
        $magazine = Magazine::findOrFail($id);
        $magazine->delete();
        Storage::delete($magazine->image);

        return redirect()->route('admin.magazines.index')->with('success', 'Berhasil Menghapus Majalah');
    }
}
