import getImage from "@/Components/getImage.js";
import { Link } from "@inertiajs/react";
import React from "react";

const PostItemLatestImageBox = ({ image, title, slug }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div id="post-item_image-box" className="image-zoom w-48 sm:w-80 lg:w-72 xl:w-96 h-full overflow-hidden margin-0 margin-auto rounded-xl">
            <Link
                href={route('posts.show', {
                    'lang': currentLanguage,
                    'slug': slug,
                })}
                class="col-span-2 lg:col-span-1"
            >
            <img
                src={getImage(image) ?? getImage('broken-image.png')}
                alt={title}
                className="w-full h-full"
            />
            </Link>
        </div>
    );
}

export default PostItemLatestImageBox;
