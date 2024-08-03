import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";
import getLocalDate from "./getLocalDate";

const PostItemFeaturedTextBox = ({ title, slug, post_category, date, user, lang }) => {
    const [t] = useTranslation('global');

    return (
        <div className="flex flex-col justify-center">
            <Link
                href={route('categories.show', {
                    "lang": lang,
                    "slug": post_category.slug,
                })}
                className="text-xs uppercase tracking-widest line-clamp-1"
            >
            <span>{post_category.name}</span>
            </Link>
            <Link
                href={route('posts.show', {
                    'lang': lang,
                    'slug': slug,
                })}
                className="sm:text-xl md:text-2xl lg:text-xl text-black font-semibold tracking line-clamp-2"
            >
            <h4 className="line-clamp-2 text-lg">{title}</h4>
            </Link>
            <div className="text-xs">
                <div className="line-clamp-1 my-1" id="author">{t('main.common.postBy')}&nbsp;
                    <Link
                        href={route('authors.show', {
                            "lang": lang,
                            "slug": user.username,
                        })}
                        className="text-black"
                    >
                    {user.name}
                    </Link>
                </div>
                <span className="line-clamp-1" id="date">{getLocalDate(date, lang)}</span>
            </div>
        </div>
    );
}

export default PostItemFeaturedTextBox
