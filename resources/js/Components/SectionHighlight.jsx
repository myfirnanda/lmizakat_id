import React from "react";
import { useTranslation } from "react-i18next";
import PostListHighlight from "./PostListHighlight";

const SectionHighlight = ({ posts }) => {
    const [t] = useTranslation('global');
    if (posts && posts.length < 6) {
        return null;
    }

    return (
        <section id="highlight" className="pt-[2rem]">
            <div className="container mx-auto">
                <h3 className="text-4xl lg:text-3xl mt-10 lg:mt-0 text-black font-semibold inline-block border-b-2 border-green-500 pb-2 mb-10">{t('main.posts.sectionTodayHighlight')}</h3>
                <PostListHighlight posts={posts} />
            </div>
        </section>
    );
}

export default SectionHighlight
