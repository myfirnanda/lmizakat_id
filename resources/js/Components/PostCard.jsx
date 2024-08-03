import React from "react";
import { Link } from "@inertiajs/react";
import getImage from "./getImage";

const PostCard = ({ image, slug, title, body, post_category }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3">
            <div className="max-w-sm h-[27rem] rounded overflow-hidden shadow-lg">
                <Link href={route('posts.show', {
                    'lang': currentLanguage,
                    'slug': slug,
                })}>
                <img
                    className="w-full h-48 object-cover"
                    src={getImage(image) ?? getImage('broken-image.png')}
                    alt={title}
                />
                </Link>
                <div className="px-6 py-4">
                    <Link href={route('posts.show', {
                        'lang': currentLanguage,
                        'slug': slug,
                    })}>
                        <div className="font-bold text-xl mb-2 line-clamp-2 text-black">{title}</div>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: body }} className="text-gray-700 text-base line-clamp-4"></p>
                </div>
                <div className="px-6 pb-2">
                    <Link href={route('categories.show', {
                        'lang': currentLanguage,
                        'slug': post_category.slug,
                    })}>
                        <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{post_category.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
