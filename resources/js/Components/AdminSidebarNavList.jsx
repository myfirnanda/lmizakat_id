import React from "react";
import AdminSidebarNavItem from "./AdminSidebarNavItem";
import { Link, useForm, usePage } from "@inertiajs/react";

const AdminSidebarNavList = ({ can }) => {
    const { url } = usePage();

    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    let top;
    if (can.superadmin || can.admin) {
        top = "top-44"
    } else if (can.writer) {
        top = "top-80"
    } else if (can.publisher) {
        top = "top-80"
    }

    return (
        <div className="relatie">
            <ul className="mt-4">
                {/* {(can.superadmin || can.admin) && ( */}
                    <AdminSidebarNavItem name="Dashboard" icon="ri-dashboard-3-line" link="admin.dashboard" />
                {/* )} */}

                {(can.superadmin || can.admin) && (
                    <AdminSidebarNavItem name="Pegawai" icon="ri-team-line" link="admin.employees.index" />
                )}

                {(can.superadmin || can.admin) && (
                    <AdminSidebarNavItem name="Spanduk" icon="ri-window-2-line" link="admin.banners.index" />
                )}

                {(can.superadmin || can.admin || can.writer) && (
                    <AdminSidebarNavItem name="Postingan" icon="ri-article-line" link="admin.posts.index" />
                )}

                {(can.superadmin || can.admin || can.publisher) && (
                    <AdminSidebarNavItem name="Majalah" icon="ri-book-2-line" link="admin.magazines.index" />
                )}

                {(can.superadmin || can.admin) && (
                    <AdminSidebarNavItem name="Kategori" icon="ri-layout-grid-fill" link="admin.categories.index" />
                )}
            </ul>
            {/* Admin */}
            <ul className={`relative h-full to ${top}`}>
            <li className={`mb-1 group w-full ${url.indexOf(`/admin/profile/${auth.user.username}`) > -1 ? 'active' : ''}`}>
                    <Link href={route('admin.profile.show', auth.user.username)} className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 gap-3">
                        <i className="ri-user-line"></i>
                        <span className="text-sm">Profil</span>
                    </Link>
                </li>
                <li className={`mb-1 group w-full ${url.startsWith(`/admin/${("heloo").toLowerCase()}`) ? 'active' : ''}`}>
                    <button
                        href={route('login')}
                        className="w-full flex items-center py-2 px-4 text-red-500 hover:bg-gray-950 hover:text-red-400 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 gap-3"
                        onClick={handleLogout}
                    >
                        <i className="ri-logout-box-r-line"></i>
                        <span className="text-sm">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebarNavList;
