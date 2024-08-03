<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render("Login", [
            "title" => "Halaman Login"
        ]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = auth()->user();

            if ($user->status === 1) {
                $request->session()->regenerate();
                return redirect()->intended('admin/dashboard');
            }

            return back()->with('error', 'User is not active');
        }

        return back()->with('error', 'Invalid email / passwod. Try again...');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
