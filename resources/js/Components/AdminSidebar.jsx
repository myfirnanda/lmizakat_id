import React from "react";
import AdminSidebarLogo from "./AdminSidebarLogo";
import AdminSidebarNavList from "./AdminSidebarNavList";

const AdminSidebar = ({ can }) => {
    return (
        <>
            <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
                <AdminSidebarLogo />
                <AdminSidebarNavList can={can} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay">
            </div>
        </>
    );
}

export default AdminSidebar;
