<?php

namespace App\Http\Controllers\API;

use App\Models\Magazine;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MagazineController extends Controller
{
    public function index()
    {
        try {
            $magazines = Magazine::latest()->get();
            return response()->json([
                "success" => true,
                "message" => "Get Magazines Successful",
                "magazines" => $magazines,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occured: " . $e->getMessage(),
            ], 500);
        }
    }


    public function show(Magazine $magazine)
    {
        try {
            $magazine = Magazine::where('slug', $magazine->slug)->first();

            if (!$magazine) {
                return response()->json([
                    "success" => false,
                    "message" => "Magazine Not Found",
                ]);
            }

            $sessionKey = 'magazine_view_' . $magazine->slug;
            $cooldownTime = 5 * 60; // 5 minutes in seconds

            if (!session()->has($sessionKey) || (time() - session($sessionKey)) > $cooldownTime) {
                $magazine->increment('views');
                session([$sessionKey => time()]);
            }

            return response()->json([
                "success" => true,
                "message" => "Get Magazine Successful",
                "magazine" => $magazine
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occured: " . $e->getMessage(),
            ], 500);
        }
    }
}
