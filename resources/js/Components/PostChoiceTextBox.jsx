import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";
import getLocalDate from "./getLocalDate";

const PostChoiceTextBox = ({ title, slug, body, post_category, user, date, lang }) => {
    const [t] = useTranslation('global');

    return (
        <div id="post-item_text-box" className="w-full flex flex-col justify-center h-full">
            <Link
                href={route('categories.show', {
                    "lang": lang,
                    "slug": post_category.slug,
                })}
                className="text-sm sm:text-base uppercase tracking-widest"
            >
            <span>{post_category.name}</span>
            </Link>
            <Link
                href={route('posts.show', {
                    'lang': lang,
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
                            "lang": lang,
                            "slug": user.username,
                        })}
                        className="text-black"
                    >
                    {user.name}
                    </Link>
                </div>
                <span id="date">{getLocalDate(date, lang)}</span>
            </div>
        </div>
    )
}

export default PostChoiceTextBox;

