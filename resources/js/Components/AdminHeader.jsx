import { Head } from "@inertiajs/react";
import React from "react";
import AdminHeaderMenu from "./AdminHeaderMenu";
import AdminHeaderBreadCrumb from "./AdminHeaderBreadCrumb";

const AdminHeader = ({ title, breadcrumb }) => {
    return (
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <Head title={title} />
            <button type="button" className="text-lg text-gray-600 sidebar-toggle">
                <i className="ri-menu-line"></i>
            </button>
            <AdminHeaderBreadCrumb breadcrumb={breadcrumb} />
            <AdminHeaderMenu />
        </div>
    );
}

export default AdminHeader;
