import { Link, useForm } from "@inertiajs/react";
import React from "react";

const AdminCategoriesContentEdit = ({ category }) => {
    const { data, setData, patch, processing, errors } = useForm({
        id: category.id,
        name: category.name,
        language: category.language,
    });

    const handleSubmit = event => {
        event.preventDefault();
        patch(route('admin.categories.update', { id: data.id }))
    }

    return (
        <>
            <Link href={route('admin.categories.index')} className="underline text-blue-500">
                <i className="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <h3 className="mt-5 font-bold text-4xl text-black">Edit Data Kategori</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="my-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Kategori</label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Bahasa Kategori</label>
                    <select
                        id="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={data.language}
                        onChange={e => setData('language', e.target.value)}
                    >
                        <option value="" disabled="disabled">Pilih bahasa</option>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">Bahasa Inggris</option>
                    </select>
                    {errors.language && <div className="text-red-500 text-xs">{errors.language}</div>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit Kategori
                </button>
            </form>
        </>
    );
}

export default AdminCategoriesContentEdit;
