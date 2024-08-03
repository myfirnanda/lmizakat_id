import PostItemHighlightImageBox from "./PostItemHighlightImageBox";
import PostItemHighlightTextBox from "./PostItemHighlightTextBox";
import React from "react";

const PostItemHighlight = ({ post }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
                <PostItemHighlightImageBox
                    {...post}
                    lang={currentLanguage}
                />
                <PostItemHighlightTextBox
                    {...post}
                    lang={currentLanguage}
                />
                {/* <div className="image-zoom overflow-hidden margin-0 margin-auto rounded-xl">
                    <Link
                    href={route('posts.show', {
                        'lang': currentLanguage,
                        'slug': slug,
                    })}
                >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full"
                />
                </Link>
                </div>
                <div className="flex flex-col justify-center">
                    <Link
                        href={route('categories.show', {
                            "lang": currentLanguage,
                            "slug": post_category.slug,
                        })}
                        className="text-xs uppercase tracking-widest line-clamp-1"
                    >
                    <span>{post_category.name}</span>
                    </Link>
                    <Link
                        href={route('posts.show', {
                            'lang': currentLanguage,
                            'slug': slug,
                        })}
                        className="sm:text-xl md:text-2xl lg:text-xl text-black font-semibold tracking line-clamp-2"
                    >
                    <h4 className="line-clamp-2 text-lg">{title}</h4>
                    </Link>
                    <div className="text-xs">
                        <div className="line-clamp-1 my-1" id="author">Oleh&nbsp;
                            <Link
                                href={route('authors.show', {
                                    "lang": currentLanguage,
                                    "slug": user.username,
                                })}
                                className="text-black"
                            >
                            {user.name}
                            </Link>
                        </div>
                        <span className="line-clamp-1" id="date">{localDate}</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default PostItemHighlight;
