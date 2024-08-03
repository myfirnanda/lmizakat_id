import { Link } from "@inertiajs/react";
import React from "react";

const AdminDashboardContent = ({ posts, magazines, dashboardPosts, dashboardMagazines }) => {

    let postsViewsTotal = posts.reduce((accumulator, post) => {
        return accumulator + post.views;
    }, 0);

    let magazinesViewsTotal = magazines.reduce((accumulator, magazine) => {
        return accumulator + magazine.views;
    }, 0);

    let viewsTotal = postsViewsTotal + magazinesViewsTotal;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex items-center h-full justify-between mb-6">
                        <div>
                            <div className="text-2xl font-semibold mb-1">{posts.length}</div>
                            <div className="text-sm font-medium text-gray-400">Jumlah Postingan</div>
                        </div>
                        <div className="bg-green-300 px-3 py-2 rounded text-4xl">
                            <i className="ri-article-line text-white"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex items-center h-full justify-between mb-6">
                        <div>
                            <div className="text-2xl font-semibold mb-1">{magazines.length}</div>
                            <div className="text-sm font-medium text-gray-400">Jumlah Majalah</div>
                        </div>
                        <div className="bg-yellow-300 px-3 py-2 rounded text-4xl">
                            <i class="ri-book-2-line text-white"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex items-center h-full justify-between mb-6">
                        <div>
                            <div className="text-2xl font-semibold mb-1">
                                {viewsTotal}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div tabIndex={0} className="card compact dropdown-content z-[1] shadow-xl bg-white rounded-box w-64">
                                        <div tabIndex={0} className="card-body">
                                            <p>Total Pengunjung Postingan: {postsViewsTotal}</p>
                                            <p>Total Pengunjung Majalah: {magazinesViewsTotal}</p>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                            <div className="text-sm font-medium text-gray-400">Jumlah Pengunjung <br/>(Sepanjang Waktu)</div>
                        </div>
                        <div className="bg-purple-300 px-3 py-2 rounded text-4xl">
                            <i class="ri-team-line text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div className="col-span-2 bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Daftar Postingan Terbaru</div>
                    </div>
                    <div className="relative overflow-auto h-64">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Postingan Terbaru
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Penulis
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bahasa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardPosts && (
                                    dashboardPosts.map(post => (
                                        <tr className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <Link href={route('admin.posts.show', post.slug)}>
                                                    {post.title}
                                                </Link>
                                            </th>
                                            <td className="px-6 py-4">
                                                {post.user.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {post.language === 'id' ? "Indonesia" : "Inggris"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-span-2 bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Daftar Majalah Terbaru</div>
                    </div>
                    <div className="relative overflow-auto h-64">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Majalah Terbaru
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Penerbit
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bahasa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardMagazines && (
                                    dashboardMagazines.map(magazine => (
                                        <tr className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <Link href={route('admin.magazines.show', magazine.slug)}>
                                                    {magazine.title}
                                                </Link>
                                            </th>
                                            <td className="px-6 py-4">
                                                {magazine.user.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {magazine.language === 'id' ? "Indonesia" : "Inggris"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Order Statistics</div>
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">10</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                            </div>
                            <span className="text-gray-400 text-sm">Active</span>
                        </div>
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">50</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                            </div>
                            <span className="text-gray-400 text-sm">Completed</span>
                        </div>
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">4</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                            </div>
                            <span className="text-gray-400 text-sm">Canceled</span>
                        </div>
                    </div>
                    <div>
                        <canvas id="order-chart"></canvas>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Earnings</div>
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[460px]">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default AdminDashboardContent;
