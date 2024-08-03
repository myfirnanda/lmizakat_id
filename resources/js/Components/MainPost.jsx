import { Link } from "@inertiajs/react";
import React from "react";
import getLocalDate from "./getLocalDate";
import { useTranslation } from "react-i18next";
import getImage from "./getImage";
import PostsAside from "./PostsAside";
import PostListRelated from "./PostListRelated";

const MainPost = ({ popularPosts, relatedPosts, image, title, body, post_category, user, date }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';
    const [t] = useTranslation('global');

    return (
        <main className="pt-[8rem] bg-white">
            <div className="mb-5 bg-slate-100">
                <div className="container mx-auto px-4 py-3">
                    <p>
                        <Link
                            href={route("posts.index", currentLanguage)}
                        >Blog</Link>
                        &nbsp;
                        &#47;
                        &nbsp;
                        <Link
                            href={route("categories.show", {
                                'lang': currentLanguage,
                                'slug': post_category.slug
                            })}
                        >
                        {post_category.name}
                        </Link>
                        &nbsp;
                        &#47;
                        &nbsp;
                        {title}
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 gap-0 lg:gap-8 xl:gap-12">
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9 my-8">
                        <h3 className="text-4xl font-bold text-black">{title}</h3>
                        <div className="flex items-center justify-between mt-10 mb-5">
                            <div className="flex items-center gap-5">
                                <img
                                    src={getImage(user.image) ?? `https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png`}
                                    alt={title}
                                    className="rounded-full h-16 w-16 object-cover"
                                />
                                <div>
                                    <p>{t('main.common.postBy')}&nbsp;
                                        <Link
                                            href={route("authors.show", {
                                                'lang': currentLanguage,
                                                'slug': user.username,
                                            })}
                                            className="text-black"
                                        >
                                            {user.name}
                                        </Link>
                                    </p>
                                    <p>
                                        {t('main.common.postIn')}&nbsp;
                                        <Link
                                            href={route("categories.show", {
                                                'lang': currentLanguage,
                                                'slug': post_category.slug
                                        })}
                                            className="text-black"
                                        >
                                            {post_category.name}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <p className="mr-8"><small>{t('main.common.postPublishedOn')}:</small><br/><span className="text-black">{getLocalDate(date, currentLanguage)}</span></p>
                        </div>
                        <div className="flex justify-center my-5">
                            <img
                                src={getImage(image) ?? getImage('broken-image.png')}
                                alt={title}
                                className="h-96 w-full xl:w-4/5 object-cover "
                            />
                        </div>
                        <div
                            dangerouslySetInnerHTML={{ __html: body }}
                            className="mt-5 text-lg text-black"
                        />
                        <div id="related-section">
                        <div className="flex justify-center w-full">
                            <h3 className="text-4xl lg:text-3xl text-black font-semibold pb-2 inline-block border-b-2 border-green-500 my-8">{t('main.post.sectionRelatedPosts')}</h3>
                        </div>
                            <PostListRelated posts={relatedPosts} />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 xl:col-span-3 my-8">
                        <PostsAside posts={popularPosts} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainPost;
