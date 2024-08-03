import { Link, usePage, router } from "@inertiajs/react";
import React from "react";
// import DataTable from "react-data-table-component";

const AdminEmployeesContent = ({ can, employees }) => {
    let counter = 0;
    let employeeRole;
    let employeeRoleStatus;
    let method;
    let url;

    const {flash} = usePage().props;

    function handleAjax(id, name, username, action, actionText) {
        if (action === "aktif" || action === "nonaktif") {
            action = action === "aktif" ? "activate" : "deactivate";
            method = "POST";
            // url = `/admin/pegawai/${action}/${username}`;
            url = route(`admin.employees.${action}`, username);

            return $.ajax({
                type: method,
                url,
                data: {
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                success: function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: `Berhasil ${actionText} ${name}`,
                    })
                    .then(() => {
                        location.reload();
                    });
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);
                    console.log(status);
                    console.log(error);
                }
            });
        } else {
            // action = "destroy";
            // method = "DELETE";
            // url = `/admin/pegawai/${username}`;
            router.delete(route('admin.employees.destroy', username))
        }
    }

    function handleSwalFire(id, name, username, icon, action) {
        if (id === null || name === null) {
            return handleDeleteEmployee(e);
        }
        let actionText;
        if (action === "nonaktif") {
            actionText = "me" + action;
        } else if (action === "hapus") {
            actionText = "menghapus";
        } else {
            actionText = "meng" + action + "kan";
        }

        return Swal.fire({
            icon,
            title: 'Apakah Anda Yakin?',
            text: `Anda akan ${actionText} ${name} ${action === "hapus" ? 'dari aplikasi' : ''}?`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: `Ya, ${action === "aktif" ? "Aktifkan" : action.charAt(0).toUpperCase() + action.slice(1)}!`,
            cancelButtonText: "Batal",
            reverseButtons: true,
        })
        .then(result => {
            if (result.isConfirmed) {
                handleAjax(id, name, username, action, actionText);
            }
        })
    }

    function handleDeactivateEmployee(e) {
        let id = e.currentTarget.closest('tr').getAttribute('data-id');
        let name = e.currentTarget.closest('tr').getAttribute('data-name') ?? 'pengguna';
        let username = e.currentTarget.closest('tr').getAttribute('data-username');
        handleSwalFire(id, name, username, 'warning', 'nonaktif');
    }

    function handleActivateEmployee(e) {
        let id = e.currentTarget.closest('tr').getAttribute('data-id');
        let name = e.currentTarget.closest('tr').getAttribute('data-name') ?? 'pengguna';
        let username = e.currentTarget.closest('tr').getAttribute('data-username');
        handleSwalFire(id, name, username, 'question', 'aktif');
    }

    function handleDeleteEmployee(e) {
        let id = e.currentTarget.closest('tr').getAttribute('data-id');
        let name = e.currentTarget.closest('tr').getAttribute('data-name') ?? 'pengguna';
        let username = e.currentTarget.closest('tr').getAttribute('data-username');
        handleSwalFire(id, name, username, 'warning', 'hapus');
    }

    // const columns = [
    //     {
    //         name: 'No',
    //         selector: (row, index) => index + 1,
    //         width: '6%',
    //     },
    //     {
    //         name: "Nama",
    //         cell: row => (
    //             <td>
    //                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
    //                     <Link href={route('admin.employees.show', row.username)}>{row.name}</Link>
    //                 </th>
    //             </td>
    //         )
    //     },
    //     {
    //         name: "Peran",
    //         cell: row => {
    //             if (row.role === "superadmin") {
    //                 employeeRole = (
    //                     <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
    //                         Super Admin
    //                     </span>
    //                 );
    //             } else if (row.role === "admin") {
    //                 employeeRole = (
    //                     <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
    //                         Admin
    //                     </span>
    //                 );
    //             } else if (row.role === "writer") {
    //                 employeeRole = (
    //                     <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
    //                         Penulis
    //                     </span>
    //                 );
    //             } else if (row.role === "publisher") {
    //                 employeeRole = (
    //                     <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
    //                         Penerbit
    //                     </span>
    //                 );
    //             }
    //             return <td>{employeeRole}</td>
    //         },
    //     },
    //     {
    //         name: "Status Peran",
    //         cell: row => {
    //             if (row.role_status === "full-time") {
    //                 employeeRoleStatus = "Full-Time"
    //             } else if (row.role_status === "contract") {
    //                 employeeRoleStatus = "Kontrak"
    //             } else if (row.role_status === "internship") {
    //                 employeeRoleStatus = "Magang"
    //             }
    //             return <td>{employeeRoleStatus}</td>
    //         },
    //     },
    //     {
    //         name: "Status",
    //         cell: row => (
    //             row.status === 0 ? (
    //                 <td><span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Tidak Aktif</span></td>
    //             ) : (
    //                 <td><span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Aktif</span></td>
    //             )
    //         )
    //     },
    //     {
    //         name: "Aksi",
    //         cell: row => (
    //             <td className="px-6 py-4">
    //                 {row.status === 1 ? (
    //                     <div className="flex justify-center">
    //                         {row.role === "superadmin" ? (
    //                             <>
    //                             {can.superadmin ? (
    //                                 <Link
    //                                     href={route('admin.employees.edit', row.username)}
    //                                 >
    //                                     <button
    //                                         type="button"
    //                                         className="activate-employee text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-md shadow-yellow-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
    //                                     >
    //                                     <i class="ri-pencil-line"></i>
    //                                     </button>
    //                                 </Link>
    //                             ) : (
    //                                 <div>No action</div>
    //                             )}
    //                             </>
    //                         ) : (
    //                             <>
    //                             <Link
    //                                 href={route('admin.employees.edit', row.username)}
    //                             >
    //                                 <button
    //                                     type="button"
    //                                     className="activate-employee text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-md shadow-yellow-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
    //                                 >
    //                                 <i class="ri-pencil-line"></i>
    //                                 </button>
    //                             </Link>
    //                             {row.role === "admin" && can.admin || (
    //                                 <button
    //                                     type="button"
    //                                     className="nonactivate-employee text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-md shadow-red-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
    //                                     onClick={handleDeactivateEmployee}
    //                                 >
    //                                     Nonaktif
    //                                 </button>
    //                             )}
    //                             </>
    //                         )}
    //                     </div>
    //                 ) : (
    //                     <div className="flex justify-center">
    //                         <button
    //                             type="button"
    //                             className="activate-employee text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-md shadow-green-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
    //                             onClick={handleActivateEmployee}
    //                         >
    //                         Aktifkan
    //                         </button>
    //                         <button
    //                             type="button"
    //                             className="delete-employee text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-md shadow-red-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
    //                             title="Hapus Pegawai"
    //                             onClick={handleDeleteEmployee}
    //                         >
    //                         <i className="ri-delete-bin-line"></i>
    //                         </button>
    //                     </div>
    //                 )}
    //             </td>
    //         )
    //     }
    // ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#F7FAFC',
            },
        },
        headCells: {
            style: {
                color: '#4A5568',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-4xl text-black">Daftar Data Pegawai</h3>
                <Link href={route('admin.employees.create')}>
                    <button className="bg-blue-500 px-3 py-2 rounded-lg text-white ">Tambah Pegawai</button>
                </Link>
            </div>
            <div>
                {flash.success && (
                    <div class="p-4 my-5 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        <span class="font-medium">Successful!</span>&nbsp;{flash.success}
                    </div>
                )}
            </div>
            <div className="mt-5 overflow-x-auto" id="users-data">
                {/* <DataTable
                    columns={columns}
                    data={employees}
                    pagination
                    customStyles={customStyles}
                /> */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500" id="users-table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Peran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Staus Peran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees ?
                            employees.map(employee => {
                                counter++;
                                if (employee.role === "superadmin") {
                                    employeeRole = (
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                            Super Admin
                                        </span>
                                    );
                                } else if (employee.role === "admin") {
                                    employeeRole = (
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                            Admin
                                        </span>
                                    );
                                } else if (employee.role === "writer") {
                                    employeeRole = (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                            Penulis
                                        </span>
                                    );
                                } else if (employee.role === "publisher") {
                                    employeeRole = (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                            Penerbit
                                        </span>
                                    );
                                }

                                if (employee.role_status === "full-time") {
                                    employeeRoleStatus = "Full-Time"
                                } else if (employee.role_status === "contract") {
                                    employeeRoleStatus = "Kontrak"
                                } else if (employee.role_status === "internship") {
                                    employeeRoleStatus = "Magang"
                                }

                                return (
                                    <tr
                                        key={employee.id}
                                        className="bg-white border-b"
                                        data-id={employee.id}
                                        data-name={employee.name}
                                        data-username={employee.username}
                                    >
                                        <td className="px-6 py-4">
                                            {counter}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link href={route('admin.employees.show', employee.username)}>{employee.name}</Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            {employeeRole}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employeeRoleStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.status === 0 ?
                                                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Tidak Aktif</span> :
                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Aktif</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.status === 1 ? (
                                                <div className="flex justify-center">
                                                    {employee.role === "superadmin" ? (
                                                        <>
                                                        {can.superadmin ? (
                                                            <Link
                                                                href={route('admin.employees.edit', employee.username)}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="activate-employee text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-md shadow-yellow-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
                                                                >
                                                                <i class="ri-pencil-line"></i>
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            <div>No action</div>
                                                        )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {employee.role === "admin" && can.admin ? (
                                                                <p>No Action</p>
                                                            ) : (
                                                                <>
                                                                    <Link
                                                                        href={route('admin.employees.edit', employee.username)}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="activate-employee text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-md shadow-yellow-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
                                                                        >
                                                                        <i class="ri-pencil-line"></i>
                                                                        </button>
                                                                    </Link>
                                                                    <button
                                                                        type="button"
                                                                        className="nonactivate-employee text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-md shadow-red-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
                                                                        onClick={handleDeactivateEmployee}
                                                                    >
                                                                        Nonaktif
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <button
                                                        type="button"
                                                        className="activate-employee text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-md shadow-green-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
                                                        onClick={handleActivateEmployee}
                                                    >
                                                    Aktifkan
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="delete-employee text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-md shadow-red-500/50 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
                                                        title="Hapus Pegawai"
                                                        onClick={handleDeleteEmployee}
                                                    >
                                                    <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            ) : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminEmployeesContent;
