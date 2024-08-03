import React from "react";
import getImage from "./getImage";
import { Link } from "@inertiajs/react";

const AdminSidebarLogo = () => {
    return (
        <Link href={route('admin.dashboard')} className="flex items-center pb-4 border-b border-b-gray-800">
            <img src={getImage('lmi-logo.png')} alt="LMI Logo" className="w-8 h-8 rounded object-cover"/>
            <span className="text-md font-bold text-white ml-3">Lembaga Manajemen Infaq</span>
        </Link>
    )
};

export default AdminSidebarLogo;
