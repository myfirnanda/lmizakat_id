import { usePage } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";

const AdminHeaderMenu = () => {
    const { auth } = usePage().props;
    return (
        <ul className="ml-auto flex items-center">
            <li className="dropdown ml-3">
                <button type="button" className="dropdown-toggle flex items-center">
                    <img src={getImage(auth.user.image) ?? `https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png`} alt="" className="w-8 h-8 rounded block object-cover align-middle"/>
                </button>
            </li>
        </ul>
    )
}

export default AdminHeaderMenu;
