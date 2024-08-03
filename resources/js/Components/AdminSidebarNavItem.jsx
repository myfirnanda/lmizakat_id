import { Link, usePage } from "@inertiajs/react";
import React from "react";

const AdminSidebarNavItem = ({ name, icon, link }) => {
    // const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';
    const { url } = usePage();
    return (
        <>
            <li className={`mb-1 group ${url.indexOf(`/admin/${name.toLowerCase()}`) > -1 ? 'active' : ''}`}>
                <Link href={route(link)} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 gap-3">
                    <i className={icon}></i>
                    <span className="mt-1 text-sm">{name}</span>
                </Link>
            </li>
        </>
    )
}

export default AdminSidebarNavItem;
