import { Link } from "@inertiajs/react";
import React from "react";
import getLocalDate from "./getLocalDate";
import getImage from "./getImage";

const AdminMagazinesContentDetail = ({ magazine }) => {
    return (
        <>
            <Link href={route('admin.magazines.index')} className="underline text-blue-500">
                <i className="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <div className="grid grid-cols-12 gap-10 mt-5">
                <div className="col-span-12 md:col-span-5">
                    <img src={getImage(magazine.image)} alt={magazine.title} />
                </div>
                <div className="col-span-12 md:col-span-7 flex items-start justify-center flex-col">
                    <h3 className="text-4xl font-bold text-black line-clamp-2">
                    {magazine.title}</h3>
                    <p className="my-3">Diterbitkan: <span className="font-bold">{getLocalDate(magazine.release, 'id', false)}</span></p>
                    <div
                        dangerouslySetInnerHTML={{ __html: magazine.description }}
                        className="text-lg"
                    />
                    <a href={magazine.link} className="mt-5" target="_blank">
                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download</button>
                    </a>
                </div>
            </div>
        </>
    );
}

export default AdminMagazinesContentDetail;
