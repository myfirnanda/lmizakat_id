import { Link } from "@inertiajs/react";
import React from "react";

const AdminHeaderBreadCrumb = ({ breadcrumb }) => {
    return (
        <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
                {breadcrumb.isParent ? <p className="text-gray-400 font-medium capitalize">{breadcrumb.parent}</p> : <Link href={route(breadcrumb.mainRoute)} className="text-gray-400 hover:text-gray-600 font-medium capitalize">{breadcrumb.parent}</Link>}
            </li>
            {!breadcrumb.isParent && (
                <>
                    <li className="text-gray-600 mr-2 font-medium">/</li>
                    <p className="text-gray-600 mr-2 font-medium capitalize">{breadcrumb.child}</p>
                </>
            )}
        </ul>
    )
}

export default AdminHeaderBreadCrumb;
