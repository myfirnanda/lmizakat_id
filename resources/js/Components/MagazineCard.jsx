import { Link } from "@inertiajs/react";
import React from "react";
import getLocalDate from "./getLocalDate";
import getImage from "./getImage";

const MagazineCard = ({ title, image, slug, description, release }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div class="col-span-12 sm:col-span-6 md:col-span-4 rounded overflow-hidden shadow-lg">
            <Link
                href={route("magazines.show", {
                    'lang': currentLanguage,
                    'slug': slug
                })}
            >
                <img class="w-full" src={getImage(image)} alt="Sunset in the mountains" />
            </Link>
            <div class="px-6 py-4">
                <Link
                    href={route("magazines.show", {
                        'lang': currentLanguage,
                        'slug': slug
                    })}
                >
                    <div class="font-bold text-xl mb-2 line-clamp-2">{title}</div>
                </Link>
                <p>{getLocalDate(release, currentLanguage, false)}</p>
            </div>
            {/* <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div> */}
        </div>
    )
}

export default MagazineCard;
