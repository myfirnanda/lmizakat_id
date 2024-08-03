import { Link } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";

const PostItemFeaturedImageBox = ({ image, title, slug, lang}) => {
    return (
        <div className="image-zoom overflow-hidden margin-0 margin-auto rounded-xl">
            <Link
                href={route('posts.show', {
                    'lang': lang,
                    'slug': slug,
                })}
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

export default PostItemFeaturedImageBox;
