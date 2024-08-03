import { Link } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";

const PostItemRelated = ({ image, title, slug, body, post_category }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <div className="rounded-lg h-[26rem] overflow-hidden shadow-lg">
                <div  className="image-zoom overflow-hidden margin-0 margin-auto">
                    <Link href={slug}>
                        <img
                            className="w-full h-48 object-cover"
                            src={getImage(image) ?? getImage('broken-image.png')}
                            alt={title}
                        />
                    </Link>
                </div>
                <div className="px-6 py-4">
                    <Link href={slug}>
                        <div className="font-bold text-xl mb-2 line-clamp-2 text-black">{title}</div>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: body }} className="text-gray-700 text-base line-clamp-3">
                    </p>
                </div>
                <div className="px-6 pb-4">
                    <Link href={route('categories.show', {
                        'lang': currentLanguage,
                        'slug': post_category.slug,
                    })}>
                    <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{post_category.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostItemRelated;
