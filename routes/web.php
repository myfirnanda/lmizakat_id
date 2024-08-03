<?php

use Inertia\Inertia;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsWriter;
use App\Http\Middleware\IsPublisher;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MagazineController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\admin\AdminPostsController;
use App\Http\Controllers\admin\AdminBannersController;
use App\Http\Controllers\admin\AdminProfileController;
use App\Http\Controllers\admin\AdminDashboardController;
use App\Http\Controllers\admin\AdminEmployeesController;
use App\Http\Controllers\admin\AdminMagazinesController;
use App\Http\Controllers\admin\AdminCategoriesController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function() {
    $lang = App::getLocale();
    return redirect()->route('posts.index', $lang);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/admin', function() {
    return redirect()->route('admin.dashboard');
});

Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate'])->name('login.authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::prefix('admin')
    ->middleware('auth')
    ->group(function() {

        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

        Route::resource('/pegawai', AdminEmployeesController::class, [
            'names' => [
                'index' => 'admin.employees.index',
                'create' => 'admin.employees.create',
                'store' => 'admin.employees.store',
                'show' => 'admin.employees.show',
                'edit' => 'admin.employees.edit',
                'update' => 'admin.employees.update',
                'destroy' => 'admin.employees.destroy',
            ],
        ])
        ->middleware(IsAdmin::class);
        // Route::get('/pegawai', [AdminEmployeesController::class, 'index'])->name('admin.employees.index');
        // Route::get('/pegawai/{username}/edit', [AdminEmployeesController::class, 'edit'])->name('admin.employees.edit');

        Route::post('/pegawai/activate/{user:username}', [AdminEmployeesController::class, 'activate'])->name('admin.employees.activate');
        Route::post('/pegawai/deactivate/{user:username}', [AdminEmployeesController::class, 'deactivate'])->name('admin.employees.deactivate');

        Route::resource('/spanduk', AdminBannersController::class, [
            'names' => [
                'index' => 'admin.banners.index',
                'create' => 'admin.banners.create',
                'store' => 'admin.banners.store',
                'show' => 'admin.banners.show',
                'edit' => 'admin.banners.edit',
                'update' => 'admin.banners.update',
                'destroy' => 'admin.banners.destroy',
            ],
        ])
        ->middleware(IsAdmin::class);

        Route::resource('/postingan', AdminPostsController::class, [
            'names' => [
                'index' => 'admin.posts.index',
                'create' => 'admin.posts.create',
                'store' => 'admin.posts.store',
                'show' => 'admin.posts.show',
                'edit' => 'admin.posts.edit',
                'update' => 'admin.posts.update',
                'destroy' => 'admin.posts.destroy',
            ],
        ])
        ->middleware(IsWriter::class);

        Route::get('/postingan/set-category/{lang}', [AdminPostsController::class, 'setCategory'])
            ->name('admin.posts.set-category');

        Route::resource('/majalah', AdminMagazinesController::class, [
            'names' => [
                'index' => 'admin.magazines.index',
                'create' => 'admin.magazines.create',
                'store' => 'admin.magazines.store',
                'show' => 'admin.magazines.show',
                'edit' => 'admin.magazines.edit',
                'update' => 'admin.magazines.update',
                'destroy' => 'admin.magazines.destroy',
            ],
        ])
        ->middleware(IsPublisher::class);

        Route::resource('/kategori', AdminCategoriesController::class, [
            'names' => [
                'index' => 'admin.categories.index',
                'create' => 'admin.categories.create',
                'store' => 'admin.categories.store',
                'show' => 'admin.categories.show',
                'edit' => 'admin.categories.edit',
                'update' => 'admin.categories.update',
                'destroy' => 'admin.categories.destroy',
            ],
    ])
    ->middleware(IsAdmin::class);

        Route::get('/profile/{username}', [AdminProfileController::class, 'show'])->name('admin.profile.show');
        Route::put('/profile/{username}', [AdminProfileController::class, 'update'])->name('admin.profile.update');
        Route::put('/profile/{username}/password', [AdminProfileController::class, 'passwordUpdate'])->name('admin.profile.password-update');
    });


// Route::get('/{lang}', function($lang) {
//     return redirect()->route('posts.index', $lang);
// });

Route::prefix('{lang}')->group(function() {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');

    Route::get('/magazines', [MagazineController::class, 'index'])->name('magazines.index');
    Route::get('/magazines/{slug}', [MagazineController::class, 'show'])->name('magazines.show');

    Route::get('/categories/{slug}', [PostCategoryController::class, 'show'])->name('categories.show');

    Route::get('/author/{slug}', [UserController::class, 'show'])->name('authors.show');
});

// require __DIR__.'/auth.php';
