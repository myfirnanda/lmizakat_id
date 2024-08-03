import { Link } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";

const AdminEmployeesContentDetail = ({ employee }) => {
    let employeeRole;
    let employeeRoleStatus;

    if (employee.role === "superadmin") {
        employeeRole = "Super Admin";
    } else if (employee.role === "admin") {
        employeeRole = "Admin";
    } else if (employee.role === "writer") {
        employeeRole = "Penulis";
    } else if (employee.role === "publisher") {
        employeeRole = "Penerbit";
    }

    if (employee.role_status === "full-time") {
        employeeRoleStatus = "Full-Time"
    } else if (employee.role_status === "contract") {
        employeeRoleStatus = "Kontrak"
    } else if (employee.role_status === "internship") {
        employeeRoleStatus = "Magang"
    }

    return (
        <>
            <Link href={route('admin.employees.index')} className="underline text-blue-500">
                <i class="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <div className="mt-5 flex flex-col md:flex-row items-center gap-5">
                <img src={getImage(employee.image ) ?? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVzs2EN7iMPeOAJCKZAeIIaOi4qJZDN9SbQ&s`} alt={employee.name} class="w-72 h-72 sm:w-96 sm:h-96 md:w-60 md:h-60 xl:w-80 xl:h-80 rounded-full object-cover object-center"/>
                <div>
                    <h4 className="font-bold text-black text-4xl mb-4 text-center md:text-left">{employee.name}</h4>
                    <p className="line-clamp-4 text-center md:text-left">{employee.description ?? "Tidak ada deskripsi"}</p>
                    <div>
                        <div className="flex items-center justify-center md:justify-between gap-10 md:gap-3 w-full md:w-2/5 text-xl mt-5" id="social-links">
                        {employee.social_link_facebook && (
                            <a
                                href={employee.social_link_facebook}
                                className="bg-green-500 py-2 px-4 rounded-full text-white"
                                target="_blank"
                            >
                                <button><i className="fa fa-facebook" aria-hidden="true"></i></button>
                            </a>
                        )}
                        {employee.social_link_instagram && (
                            <a
                                href={employee.social_link_instagram}
                                className="bg-green-500 py-2 px-3 rounded-full text-white"
                                target="_blank"
                            >
                                <button><i className="fa fa-instagram" aria-hidden="true"></i></button>
                            </a>
                        )}
                        {employee.social_link_linkedin && (
                            <a
                                href={employee.social_link_linkedin}
                                className="bg-green-500 py-2 px-[0.85rem] rounded-full text-white"
                                target="_blank"
                            >
                                <button><i className="fa fa-linkedin-square" aria-hidden="true"></i></button>
                            </a>
                        )}
                        {employee.social_link_youtube && (
                            <a
                                href={employee.social_link_youtube}
                                className="bg-green-500 py-2 px-[0.65rem] rounded-full text-white"
                                target="_blank"
                            >
                                <button><i className="fa fa-youtube-play" aria-hidden="true"></i></button>
                            </a>
                        )}
                        {employee.social_link_twitter && (
                            <a
                                href={employee.social_link_twitter}
                                className="bg-green-500 py-2 px-[0.75rem] rounded-full text-white"
                                target="_blank"
                            >
                                <button><i className="fa fa-twitter" aria-hidden="true"></i></button>
                            </a>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center md:inline">
                <table class="table-auto w-80 mt-8 ml-5">
                    <tbody>
                        <tr>
                            <td className="pb-3">Peran:</td>
                            <td className="pb-3 font-bold text-black">:&nbsp;{employeeRole}</td>
                        </tr>
                        <tr>
                            <td className="pb-3">Status Peran</td>
                            <td className="pb-3 font-bold text-black">:&nbsp;{employeeRoleStatus}</td>
                        </tr>
                        <tr>
                            <td className="pb-3">Status</td>
                            <td className="pb-3 font-bold text-black">:&nbsp;{employee.status}</td>
                        </tr>
                        <tr>
                            <td className="pb-3">Tanggal Lahir</td>
                            <td className="pb-3 font-bold text-black">:&nbsp;{employee.birth_date}</td>
                        </tr>
                        <tr>
                            <td className="pb-3">Nomor Telepon</td>
                            <td className="pb-3 font-bold text-black">:&nbsp;{employee.phone_number}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminEmployeesContentDetail;
