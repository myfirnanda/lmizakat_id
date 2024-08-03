import React from "react";
import PostCardFeatured from "./PostCardFeatured";
import PostListFeatured from "./PostListFeatured";
import { useTranslation } from "react-i18next";

const SectionFeatured = ({ posts, banners }) => {
    const [t] = useTranslation('global');

    return (
        posts && posts.length >= 7 ? (
            <section id="section_featured" className={banners && banners.length < 1 ? "pt-[8rem]" : "pt-[2rem]"}>
                <h3 className="text-4xl lg:text-3xl mt-10 lg:mt-0 text-black font-semibold inline-block border-b-2 border-green-500 pb-2 mb-10">{t('main.posts.sectionFeaturedPosts')}</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 xl:col-span-4">
                        <PostCardFeatured posts={posts} />
                    </div>
                    <div className="col-span-12 xl:col-span-8">
                        <PostListFeatured posts={posts} />
                    </div>
                </div>
            </section>
        ) : null
    );
}

export default SectionFeatured;
