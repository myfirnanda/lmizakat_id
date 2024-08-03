import React from 'react';
import SectionLatestPagination from './SectionLatestPagination';
import { useTranslation } from "react-i18next";
import PostListCard from './PostListCard';
import AuthorProfile from './AuthorProfile';

const MainAuthor = ({ author, posts }) => {
    const [t] = useTranslation('global');

    return (
        <main className='pt-[8rem] bg-white'>
            <div className="container mx-auto px-4">
                <section id="profile">
                    <AuthorProfile {...author} />
                    <section id="posts">
                        <h3 className="text-4xl lg:text-3xl mt-20 lg:mt-16 text-black font-semibold inline-block border-b-2 border-green-500 pb-2 mb-10">{t('main.author.sectionLatestPosts')}</h3>
                        <PostListCard posts={posts} />
                        <SectionLatestPagination posts={posts} />
                    </section>
                </section>
            </div>
        </main>
    );
}

export default MainAuthor;
