import AdminHeader from "@/Components/AdminHeader";
import AdminMagazineContent from "@/Components/AdminMagazinesContent";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminMagazine = ({ can, breadcrumb, title, magazines }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminMagazineContent magazines={magazines} />
                </div>
            </main>
        </>
    );
}

export default AdminMagazine;
