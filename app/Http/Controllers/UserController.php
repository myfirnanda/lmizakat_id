<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\PostCategory;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($lang, $slug)
    {
        $author = User::where('username', $slug)->firstOrFail();

        $categories = PostCategory::where('language', $lang)->get();

        $posts = $author
                ->posts()
                ->with('postCategory')
                ->where('language', $lang)
                ->latest()
                ->paginate(8);

                // dd($posts);

        return Inertia::render('Author', [
            "title" => "Penulis : " . $author->name,
            "author" => $author,
            "posts" => $posts,
            "categories" => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'image' => 'nullable|image|max:2048',
            'is_admin' => 'required'
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->image = 'user.png';
        $user->is_admin = $request->is_admin;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/user/'), $imageName);
            $user->image = $imageName;
        }
        $user->save();
        return back()->with('success', 'Pengguna berhasil ditambahkan!');
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'image' => 'nullable|image|max:2048',
            'is_admin' => 'required'
        ]);
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->is_admin = $request->is_admin;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/user/'), $imageName);
            $user->image = $imageName;
        }
        $user->save();

        return back()->with('success', 'Pengguna berhasil diperbarui!');
    }

    public function destroy($id)
    {
        User::find($id)->delete();
        return back()->with('success', 'Pengguna berhasil dihapus!');
    }
}
