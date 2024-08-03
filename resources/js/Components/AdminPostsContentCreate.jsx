import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import CkEditor from "./CkEditor";
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AdminPostsContentCreate = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        title: '',
        language: '',
        category_id: '',
        is_featured: false,
        is_choice: false,
        body: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('admin.posts.store'));
    };

    const onChangeLanguageHandler = async e => {
        const newLanguage = e.target.value;
        setData('language', newLanguage);

        try {
            $.ajax({
                type: "GET",
                // url: `/admin/postingan/set-category/${newLanguage}`,
                url: route(`admin.posts.set-category`, newLanguage),
                // data: { lang: newLanguage },
                success: function(result) {
                    $('#category_id').empty();
                    $('#category_id').append('<option value="" disabled selected>Pilih Kategori</option>');
                    result.forEach(data => {
                        $("#category_id").append(`<option value="${data.id}">${data.name}</option>`);
                    });
                    $('#category_id').attr("disabled", false);
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);
                    console.log(status);
                    console.log(error);
                },
            });
        } catch (e) {
            console.log("Error fetching language data:", e);
        }
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
            <Link href={route('admin.posts.index')} className="underline text-blue-500">
                <i className="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <h3 className="mt-5 font-bold text-4xl text-black">Tambah Data Postingan</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="my-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Gambar Postingan</label>
                    <img className="img-preview hidden w-96 object-cover mb-5" />
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={onChangePreviewImage}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 1024x1024px).</p>
                    {errors.image && <div className="text-red-500 text-xs">{errors.image}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Judul Postingan</label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                    />
                    {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Bahasa Postingan</label>
                    <select
                        id="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={data.language}
                        // onChange={e => setData('language', e.target.value)}
                        onChange={onChangeLanguageHandler}
                    >
                        <option value="" disabled="disabled">Pilih bahasa</option>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">Bahasa Inggris</option>
                    </select>
                    {errors.language && <div className="text-red-500 text-xs">{errors.language}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900">Kategori Postingan</label>
                    <select
                        id="category_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        disabled="disabled"
                    >
                    </select>
                    {errors.category_id && <div className="text-red-500 text-xs">{errors.category_id}</div>}
                </div>
                <div className="my-5">
                    <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900">Status Postingan</label>
                    <div class="flex items-center mb-4">
                        <input
                            id="featured-post"
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={e => setData('is_featured', e.target.checked)}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label for="featured-post" class="ms-2 text-sm font-medium text-gray-900">Postingan Unggulan</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input
                            id="choice-post"
                            type="checkbox"
                            checked={data.is_choice}
                            onChange={e => setData('is_choice', e.target.checked)}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label for="choice-post" class="ms-2 text-sm font-medium text-gray-900">Postingan Pilihan</label>
                    </div>
                </div>
                <div className="my-5">
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900">Isi Postingan</label>
                    {/* <textarea
                        id="body"
                        rows="10"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tulis postingan disini..."
                        value={data.body}
                        onChange={e => setData('body', e.target.value)}
                    /> */}
                    <CkEditor
                        value={data.body}
                        onChange={(data) => setData('body', data)}
                    />
                    {errors.body && <div className="text-red-500 text-xs">{errors.body}</div>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Tambah Postingan
                </button>
            </form>
        </>
    );
};

export default AdminPostsContentCreate;
