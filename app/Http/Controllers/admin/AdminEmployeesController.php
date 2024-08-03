<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;

class AdminEmployeesController extends Controller
{
    public function generateShortUID() {
        $randomHex = substr(md5(rand()), 0, 6);
        $decimalNumber = base_convert($randomHex, 16, 10);
        $shortUUID = str_pad($decimalNumber, 8, '0', STR_PAD_LEFT);
        return $shortUUID;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $title = "Daftar Pegawai";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $employees = User::all();

        return Inertia::render('AdminEmployee', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "",
                "parent" => "pegawai",
                "child" => "",
                "isParent" => true,
            ],
            "employees" => $employees,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = "Tambah Pegawai";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];

        return Inertia::render('AdminEmployeeCreate', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.employees.index",
                "parent" => "pegawai",
                "child" => "tambah pegawai",
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
            "breadcrumb" => [
                "mainRoute" => "admin.employees.index",
                "parent" => "pegawai",
                "child" => "tambah pegawai",
                "isParent" => false,
            ],
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "birth_date" => "required",
            "phone_number" => "required",
            "role" => "required",
            "role_status" => "required",
        ]);

        $username = Str::slug($request->name, '-') . '-' . $this->generateShortUID();

        $birthDate = str_replace('-', '', $request->birth_date);
        $password = Hash::make($birthDate); // YYYYMMDD

        User::create([
            "id" => $this->generateShortUID(),
            "name" => $validatedData["name"],
            "username" => $username,
            "email" => $validatedData["email"],
            "password" => $password,
            "birth_date" => $validatedData["birth_date"],
            "phone_number" => $validatedData["phone_number"],
            "role" => $validatedData["role"],
            "role_status" => $validatedData["role_status"],
        ]);

        return redirect()->route('admin.employees.index')->with('Berhasil Menambah Pegawai');
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user, $username)
    {
        $title = "Tambah Pegawai";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $employee = User::where('username', $username)->firstOrFail();

        return Inertia::render('AdminEmployeeDetail', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.employees.index",
                "parent" => "pegawai",
                "child" => "detail pegawai",
                "isParent" => false,
            ],
            "employee" => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user, $username)
    {
        $title = "Edit Pegawai";
        $can = [
            'superadmin' => Gate::allows('superadmin'),
            'admin' => Gate::allows('admin'),
            'writer' => Gate::allows('writer'),
            'publisher' => Gate::allows('publisher')
        ];
        $user = User::where('username', $username)->firstOrFail();

        return Inertia::render('AdminEmployeeEdit', [
            "title" => $title,
            "can" => $can,
            "breadcrumb" => [
                "mainRoute" => "admin.employees.index",
                "parent" => "pegawai",
                "child" => "edit pegawai",
                "isParent" => false,
            ],
            "employee" => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        $user = User::findOrFail($request->id);

        $validatedData = $request->validate([
            "name" => "required",
            "email" => "required|email",
            "birth_date" => "required",
            "phone_number" => "required",
            "role" => "required",
            "role_status" => "required",
        ]);

        $user->name = $validatedData["name"];
        $user->email = $validatedData["email"];
        $user->birth_date = $validatedData["birth_date"];
        $user->phone_number = $validatedData["phone_number"];
        $user->role = $validatedData["role"];
        $user->role_status = $validatedData["role_status"];

        $user->save();

        return redirect()->route('admin.employees.index')->with('success', 'Berhasil Memperbarui Pegawai');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user, $username)
    {
        try {
            $user = User::where('username', $username)->firstOrFail();
            $user->delete();
            return redirect()->route('admin.employees.index')->with('success', 'Berhasil Menghapus Pegawai');
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
    }

    public function activate(User $user)
    {
        $user = User::where('username', $user->username)
                    ->firstOrFail()
                    ->update(['status' => 1]);
    }

    public function deactivate(User $user)
    {
        $user = User::where('username', $user->username)
                    ->firstOrFail()
                    ->update(['status' => 0]);
    }
}
