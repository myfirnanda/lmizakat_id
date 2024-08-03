import { Link, router, useForm } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";

const AdminBannersContentEdit = ({ banner }) => {
    const { data, setData, post, processing, errors } = useForm({
        id: banner.id,
        image: banner.image,
        title: banner.title,
        link: banner.link,
        language: banner.language,
    });

    const handleSubmit = event => {
        event.preventDefault();
        router.post(route('admin.banners.update', banner.id), {
            ...data,
            _method: 'put',
            forceFormData: true,
        });
    }

    const onChangePreviewImage = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const oFReader = new FileReader();
            oFReader.readAsDataURL(file);
            oFReader.onload = function(e) {
                document.querySelector(".img-preview").src = e.target.result;
                document.querySelector(".img-preview").style.display = "block";
            };
        }
    };

    return (
        <>
            <Link href={route('admin.banners.index')} className="underline text-blue-500">
                <i className="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <h3 className="mt-5 font-bold text-4xl text-black">Edit Data Spanduk</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="my-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Gambar Postingn</label>
                    {banner.image ?
                        <img src={getImage(banner.image)} className="img-preview mb-3 w-96 object-cover" />
                    : <img className="img-preview hidden w-96 object-cover" />}
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        aria-describedby="file_input_help"
                        id="file_input"
                        name="image"
                        type="file"
                        onChange={onChangePreviewImage}
                        // onChange={e => setData('image', e.target.value)}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 1024x1024px).</p>
                    {errors.image && <div className="text-red-500 text-xs">{errors.image}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Judul Spanduk <small className="text-gray-400">(Tidak Wajib Diisi)</small></label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        name="title"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                    />
                    {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">Link Spanduk</label>
                    <input
                        type="text"
                        id="link"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        name="link"
                        value={data.link}
                        onChange={e => setData('link', e.target.value)}
                    />
                    {errors.link && <div className="text-red-500 text-xs">{errors.link}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Bahasa Kategori</label>
                    <select
                        id="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        name="language"
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
                    Perbatui Spanduk
                </button>
            </form>
        </>
    );
};

export default AdminBannersContentEdit;
