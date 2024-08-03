import { Link, useForm } from "@inertiajs/react";
import React from "react";

const AdminEmployeesContentCreate = () => {
    const {data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role: '',
        role_status: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('admin.employees.store'))
    };

    return (
        <>
            <Link href={route('admin.employees.index')} className="underline text-blue-500">
                <i class="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <h3 className="mt-5 font-bold text-4xl text-black">Tambah Data Pegawai</h3>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Nama Anda"
                        required
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Alamat Email</label>
                    <input
                        type="email" id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="contoh: nama@lmizakat.id"
                        required
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="birth-date" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                    <input
                        type="date"
                        id="birth-date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@flowbite.com"
                        required
                        value={data.birth_date}
                        onChange={e => setData('birth_date', e.target.value)}
                    />
                    {errors.birth_date && <div className="text-red-500 text-xs">{errors.birth_date}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                    <input
                        type="number"
                        id="phone-number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0812-3456-7890"
                        required
                        value={data.phone_number}
                        onChange={e => setData('phone_number', e.target.value)}
                    />
                    {errors.phone_number && <div className="text-red-500 text-xs">{errors.phone_number}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Peran</label>
                    <select
                        id="role"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={data.role}
                        onChange={e => setData('role', e.target.value)}
                    >
                        <option value="" selected>Pilih Peran</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                        <option value="writer">Penulis</option>
                        <option value="publisher">Penerbit</option>
                    </select>
                    {errors.role && <div className="text-red-500 text-xs">{errors.role}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="role-status" className="block mb-2 text-sm font-medium text-gray-900">Status Peran</label>
                    <select
                        id="role-status"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={data.role_status}
                        onChange={e => setData('role_status', e.target.value)}
                    >
                        <option value="" selected>Pilih Status Peran</option>
                        <option value="full-time">Full-time</option>
                        <option value="contract">Kontrak</option>
                        <option value="internship">Magang</option>
                    </select>
                    {errors.role_status && <div className="text-red-500 text-xs">{errors.role_status}</div>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tambah Pengguna</button>
            </form>
        </>
    )
}

export default AdminEmployeesContentCreate;
