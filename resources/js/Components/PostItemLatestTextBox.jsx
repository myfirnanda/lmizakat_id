import React from "react";
import { Link } from "@inertiajs/react";
import getLocalDate from "@/Components/getLocalDate.js";
import { useTranslation } from "react-i18next";

const PostItemLatestTextBox = ({ title, slug, body, date, categoryName, categorySlug, authorName, authorUsername }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';
    const [t] = useTranslation('global')

    return (
        <div id="post-item_text-box" className="w-full">
            <Link
                href={route('categories.show', {
                    "lang": currentLanguage,
                    "slug": categorySlug,
                })}
                className="text-sm sm:text-base uppercase tracking-widest"
            >
            <span>{categoryName}</span>
            </Link>
            <Link
                href={route('posts.show', {
                    'lang': currentLanguage,
                    'slug': slug,
                })}
                className="text-lg sm:text-2xl xl:text-3xl text-black font-semibold tracking line-clamp-2"
            >
            <h4 className="mt-1 mb-2">{title}</h4>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: body }} className="line-clamp-2 text-sm sm:text-base"></p>
            <div className="flex justify-between text-sm sm:text-base mt-3 sm:mt-6">
                <div id="author">{t('main.common.postBy')}&nbsp;
                    <Link
                        href={route('authors.show', {
                            "lang": currentLanguage,
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
};

export default PostItemLatestTextBox
