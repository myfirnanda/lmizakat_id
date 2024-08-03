import AdminEmployeesContentCreate from "@/Components/AdminEmployeesContentCreate";
import AdminHeader from "@/Components/AdminHeader";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminEmployeeCreate = ({ breadcrumb, title, can }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminEmployeesContentCreate />
                </div>
            </main>
        </>
    )
};

export default AdminEmployeeCreate;
