import AdminCategoriesContentCreate from "@/Components/AdminCategoriesContentCreate";
import AdminHeader from "@/Components/AdminHeader";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminCategoryCreate = ({ can, breadcrumb, title }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminCategoriesContentCreate />
                </div>
            </main>
        </>
    );
}

export default AdminCategoryCreate;
