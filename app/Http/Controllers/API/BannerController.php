<?php

namespace App\Http\Controllers\API;

use App\Models\Banner;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        try {
            $banners = Banner::latest()->get();
            return response()->json([
                "success" => true,
                "message" => "Get Banners Successful",
                "banners" => $banners,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occured: " . $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $banner = Banner::findById($id)->first();

            if (!$banner) {
                return response()->json([
                    "success" => false,
                    "message" => "Banner Not Found"
                ], 404);
            }

            return response()->json([
                "success" => true,
                "message" => "Get Banner Successful",
                "banner" => $banner,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occured: " . $e->getMessage(),
            ], 500);
        }
    }
}
