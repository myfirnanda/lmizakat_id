import AdminCategoriesContentEdit from "@/Components/AdminCategoriesContentEdit";
import AdminHeader from "@/Components/AdminHeader";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminCategoryEdit = ({ breadcrumb, category, can, title }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminCategoriesContentEdit category={category} />
                </div>
            </main>
        </>
    );
}

export default AdminCategoryEdit;
