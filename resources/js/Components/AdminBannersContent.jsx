import { Link, usePage, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import getImage from "./getImage";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

const AdminBannersContent = ({ banners }) => {

    const tabData = [
        { label: "Bahasa Indonesia", value: "id" },
        { label: "Bahasa Inggris", value: "en" },
    ];

    const { flash } = usePage().props;

    const [counter, setCounter] = useState(0);

    const [activeTab, setActiveTab] = useState(tabData[0].value);

    useEffect(() => {
        setCounter(0);
    }, [activeTab]);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };

    const handleDeleteBanner = (e, id) => {
        e.preventDefault();

        return Swal.fire({
            icon: "warning",
            title: "Apakah Anda Yakin?",
            text: "Anda akan menghapus data spanduk ini?",
            showCancelButton: true,
            confirmButtonColor: "#FF3131",
            confirmButtonText: `Ya, Hapus`,
            cancelButtonText: "Batal",
            reverseButtons: true,
        })
        .then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.banners.destroy', id));
            }
        })
    }

    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            width: '6%',
        },
        {
            name: "Spanduk",
            cell: row => (
                <div className="text-start w-full">
                    <img src={getImage(row.image)} className="w-96 object-cover" alt="Spanduk" />
                    <div className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {row.title ? (
                            <h3 className="line-clamp-1 text-lg">{row.title}</h3>
                        ) : (
                            <small className="text-gray-400">[ Tanpa Judul ]</small>
                        )}
                    </div>
                </div>
            ),
            width: '78%',
        },
        {
            name: "Aksi",
            cell: row => (
                <td>
                    <div className="flex">
                        <Link href={route('admin.banners.edit', row.id)}>
                            <button type="button" className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">
                            <i className="ri-pencil-line"></i>
                            </button>
                        </Link>
                        <form onSubmit={(e => handleDeleteBanner(e, row.id))}>
                            <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2"><i className="ri-delete-bin-line"></i></button>
                        </form>
                    </div>
                </td>
            ),
            width: '6%',
        }
    ];

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
                <h3 className="font-bold text-4xl text-black">Daftar Data Spanduk</h3>
                <Link href={route('admin.banners.create')}>
                    <button className="bg-blue-500 px-3 py-2 rounded-lg text-white ">Tambah Spanduk</button>
                </Link>
            </div>
            <div>
                {flash.success && (
                    <div className="p-4 my-5 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        <span className="font-medium">Successful!</span>&nbsp;{flash.success}
                    </div>
                )}
            </div>
            <Tabs value={activeTab} onChange={setActiveTab} className="mt-5">
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-1/3"
                    indicatorProps={{
                    className:
                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {tabData.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : "text-gray-500"}
                    >
                        {label}
                    </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {tabData.map(({ value }) => (
                    <TabPanel key={value} value={value}>
                        <DataTable
                        columns={columns}
                        data={banners.filter(banner => banner.language === value)}
                        pagination
                        customStyles={customStyles}
                        />
                    </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
            {/* <Tabs aria-label="Tabs with icons" style="underline" className="mt-3"> */}
                {/* <Tabs.Item active={activeTab === 'id'} title="Spanduk Bahasa Indonesia" onClick={() => handleTabChange('id')}>
                    <div className="" id="users-data">
                        <DataTable
                            columns={columns}
                            data={banners.filter(banner => banner.language === "id")}
                            pagination
                            customStyles={customStyles}
                        />
                    </div>
                </Tabs.Item> */}
                {/* <Tabs.Item active={activeTab === 'en'} title="Spanduk Bahasa Inggris" onClick={() => handleTabChange('en')}>
                    <div className="" id="users-data">
                        <DataTable
                            columns={columns}
                            data={banners.filter(banner => banner.language === "en")}
                            pagination
                            customStyles={customStyles}
                        />
                    </div>
                </Tabs.Item> */}
            {/* </Tabs> */}
        </>
    );
}

export default AdminBannersContent;
