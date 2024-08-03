import AdminHeader from "@/Components/AdminHeader";
import AdminMagazinesContentDetail from "@/Components/AdminMagazinesContentDetail";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminMagazineDetail = ({ can, breadcrumb, title, magazine }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminMagazinesContentDetail magazine={magazine} />
                </div>
            </main>
        </>
    )
}

export default AdminMagazineDetail;
