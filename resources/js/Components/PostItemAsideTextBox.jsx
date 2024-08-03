import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import getLocalDate from "@/Components/getLocalDate.js";

const PostItemAsideTextBox = ({ title, slug, date, categoryName, categorySlug, authorName, authorUsername }) => {
    const [t] = useTranslation('global');

    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div id="post-item_text-box" className="w-full">
            <Link
                href={route('categories.show', {
                    "lang": currentLanguage,
                    "slug": categorySlug,
                })}
                className="text-sm uppercase tracking-widest"
            >
            <span>{categoryName}</span>
            </Link>
            <Link
                href={route('posts.show', {
                    'lang': currentLanguage,
                    'slug': slug,
                })}
                className="text-lg  sm:text-xl md:text-2xl lg:text-xl text-black font-semibold tracking line-clamp-2"
            >
            <h4 className="mt-1 mb-2">{title}</h4>
            </Link>
            <div className="text-sm">
                <div className="my-1" id="author">{t('main.common.postBy')}&nbsp;
                    <Link
                        href={route('authors.show', {
                            "lang": "id",
                            "slug": authorUsername,
                        })}
                        className="text-black"
                    >
                    {authorName}
                    </Link>
                </div>
                <span id="date">{getLocalDate(date, currentLanguage)}</span>
            </div>
        </div>
    );
}

export default PostItemAsideTextBox;
