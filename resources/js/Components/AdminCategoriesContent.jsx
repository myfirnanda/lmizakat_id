import { Link, usePage, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


const AdminCategoriesContent = ({ categories }) => {

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

    const handleDeleteCategory = (e, slug, name) => {
        e.preventDefault();

        Swal.fire({
            icon: 'warning',
            title: 'Apakah Anda Yakin?',
            html: `<div className="line-clamp-2">Anda Akan menghapus postingan ${name}</div>`,
            showCancelButton: true,
            confirmButtonColor: "#FF3131",
            confirmButtonText: `Ya, Hapus`,
            cancelButtonText: "Batal",
            reverseButtons: true,
        })
        .then(result => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    router.delete(route('admin.categories.destroy', slug))
                }
            }
        });
    }

    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            width: '6%',
        },
        {
            name: "Nama Kategori",
            selector: row => row.name,
            width: '80%'
        },
        {
            name: "Aksi",
            cell: row => (
                <td>
                    <div className="flex">
                        <Link href={route('admin.categories.edit', row.slug)}>
                            <button type="button" className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">
                            <i className="ri-pencil-line"></i>
                            </button>
                        </Link>
                        <form onSubmit={(e => handleDeleteCategory(e, row.slug, row.name))}>
                            <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2"><i className="ri-delete-bin-line"></i></button>
                        </form>
                    </div>
                </td>
            ),
        },
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
                <h3 className="font-bold text-4xl text-black">Daftar Data Kategori</h3>
                <Link href={route('admin.categories.create')}>
                    <button className="bg-blue-500 px-3 py-2 rounded-lg text-white ">Tambah Kategori</button>
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
                        data={categories.filter(category => category.language === value)}
                        pagination
                        customStyles={customStyles}
                        />
                    </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
            {/* <Tabs aria-label="Tabs with icons" style="underline" className="mt-3">
                <Tabs.Item active={activeTab === 'id'} title="Kategori Bahasa Indonesia" onClick={() => handleTabChange('id')}>
                    <div className="" id="users-data">
                        <DataTable
                            columns={columns}
                            data={categories.filter(category => category.language === "id")}
                            pagination
                            customStyles={customStyles}
                        />
                    </div>
                </Tabs.Item>
                <Tabs.Item active={activeTab === 'en'} title="Kategori Bahasa Inggris" onClick={() => handleTabChange('en')}>
                    <div className="" id="users-data">
                        <DataTable
                            columns={columns}
                            data={categories.filter(category => category.language === "en")}
                            pagination
                            customStyles={customStyles}
                        />
                    </div>
                </Tabs.Item>
            </Tabs> */}
        </>
    );
}

export default AdminCategoriesContent;
