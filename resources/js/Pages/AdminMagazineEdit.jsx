import AdminHeader from "@/Components/AdminHeader";
import AdminMagazinesContentEdit from "@/Components/AdminMagazinesContentEdit";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminMagazineEdit = ({ can, breadcrumb, title, magazine }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminMagazinesContentEdit magazine={magazine} />
                </div>
            </main>
        </>
    )
}

export default AdminMagazineEdit;
