import AdminEmployeesContentDetail from "@/Components/AdminEmployeesContentDetail";
import AdminHeader from "@/Components/AdminHeader";
import AdminSidebar from "@/Components/AdminSidebar";
import React from "react";

const AdminEmployeeDetail = ({ employee, breadcrumb, title, can }) => {
    return (
        <>
            <AdminSidebar can={can} />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <AdminHeader breadcrumb={breadcrumb} title={title} />
                <div className="p-6">
                    <AdminEmployeesContentDetail employee={employee} />
                </div>
            </main>
        </>
    );
}

export default AdminEmployeeDetail;
