<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\BannerController;
use App\Http\Controllers\API\MagazineController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/banners', [BannerController::class, 'index'])->name('api.banner.index');
Route::get('/banners/{id}', [BannerController::class, 'show'])->name('api.banner.show');

Route::get('/posts', [PostController::class, 'index'])->name('api.posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('api.posts.show');

Route::get('/magazines', [MagazineController::class, 'index'])->name('api.magazine.index');
Route::get('/magazines/{magazine:slug}', [MagazineController::class, 'show'])->name('api.magazine.show');
