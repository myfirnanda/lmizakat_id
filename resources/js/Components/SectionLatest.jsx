import React from "react";
import PostListLatest from "./PostListLatest";
import SectionLatestPagination from "./SectionLatestPagination";
import { useTranslation } from "react-i18next";
import PostsAside from "./PostsAside";

const SectionLatest = ({ latestPosts, popularPosts }) => {
    const [t] = useTranslation('global');
    let postsData = latestPosts.data;
    return (
        <section id="section_latest" className="grid grid-cols-12 lg:gap-12 xl:gap-16 pt-[2rem]">
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                <h3 className="text-4xl lg:text-3xl mt-10 lg:mt-0 text-black font-semibold inline-block border-b-2 border-green-500 pb-2 mb-10">{t('main.posts.sectionLatestPosts')}</h3>
                <PostListLatest posts={postsData} />
                <SectionLatestPagination posts={latestPosts} />
            </div>
            <div className="col-span-12 lg:col-span-4 xl:col-span-3">
                <PostsAside posts={popularPosts} />
            </div>
        </section>
    );
}

export default SectionLatest;
