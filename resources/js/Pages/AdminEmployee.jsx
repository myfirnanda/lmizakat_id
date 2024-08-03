import AdminEmployeesContent from "@/Components/AdminEmployeesContent";
import AdminHeader from "@/Components/AdminHeader";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminEmployee = ({ employees, breadcrumb, can, title }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminEmployeesContent employees={employees} can={can} />
                </div>
            </main>
        </>
    );
}

export default AdminEmployee;
