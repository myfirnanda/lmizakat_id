import React from "react";
import PostListAside from "./PostListAside.jsx";
import { useTranslation } from "react-i18next";

const PostsAside = ({ posts }) => {
    const [t] = useTranslation('global');
    return (
        <aside className="sticky top-28 mb-10">
            <h3 className="text-4xl lg:text-3xl mt-10 lg:mt-0 text-black font-semibold inline-block border-b-2 border-green-500 pb-2 mb-10">{t('main.aside.sectionPopularPosts')}</h3>
            <PostListAside posts={posts} />
        </aside>
    );
}

export default PostsAside;
