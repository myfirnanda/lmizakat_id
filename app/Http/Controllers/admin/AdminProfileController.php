<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class AdminProfileController extends Controller
{
    public function show()
    {
        $user = User::where('username', auth()->user()->username)->firstOrFail();
        $title = "Profile Pegawai";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        return Inertia::render('AdminProfile', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.profile.show",
                "parent" => "Profil Pengguna",
                "child" => "",
                "isParent" => true,
            ],
            "user" => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = User::where('username', $request->username)->firstOrFail();

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::delete($user->image);
            }
            $validatedData['image'] = $request->file('image')->store('users-image');
            $user->image = $validatedData["image"];
        }

        $user->description = $request->description;
        $user->social_link_facebook = $request->social_link_facebook;
        $user->social_link_instagram = $request->social_link_instagram;
        $user->social_link_linkedin = $request->social_link_linkedin;
        $user->social_link_youtube = $request->social_link_youtube;
        $user->social_link_twitter = $request->social_link_twitter;

        $user->save();

        return redirect()->route('admin.profile.show', ['username' => $user->username])->with('success', 'Berhasil Memperbarui Profil Pengguna');
    }

    public function passwordUpdate(Request $request, $username)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('username', $username)->firstOrFail();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Password lama tidak cocok'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect()->route('admin.profile.show', auth()->user()->username)->with('success', 'Berhasil Memperbarui Password');
    }
}
