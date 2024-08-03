import React from "react";
import { Link } from "@inertiajs/react";
import getImage from "./getImage";

const PostCardFeatured = ({ posts }) => {
    const post = posts[0];
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div className="flex flex-col justify-between h-f=ll gap-4">
            <div  className="image-zoom overflow-hidden margin-0 margin-auto rounded-xl">
                <Link
                    href={route('posts.show', {
                        'lang': currentLanguage,
                        'slug': post.slug,
                    })}
                    class="overflow-hidden margin-0 margin-auto rounded-xl"
                    id="image-zoom"
                >
                <img
                    src={getImage(post.image) ?? getImage('broken-image.png')}
                    alt={post.title}
                    className="w-full h-full"
                />
                </Link>
            </div>
            <div>
                <Link href={route('posts.show', {
                    'lang': currentLanguage,
                    'slug': post.slug,
                })}>
                    <div className="font-bold text-xl mb-2 line-clamp-2 text-black">{post.title}</div>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: post.body }} className="text-gray-700 text-base line-clamp-3">
                    </p>
            </div>
            <div>
                <Link href={route('categories.show', {
                    'lang': currentLanguage,
                    'slug': post.post_category.slug,
                })}>
                <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{post.post_category.name}</span>
                </Link>
            </div>
        </div>
    )
}

export default PostCardFeatured;
