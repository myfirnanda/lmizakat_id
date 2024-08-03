import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MainPosts from "@/Components/MainPosts";
import React from "react";

const Posts = ({banners, categories, featuredPosts, choicePost, highlightPosts, popularPosts, latestPosts, title}) => {
    return (
        <>
            <div className="fixed h-full w-full top-0 left-0 z-40" id="overlay"></div>
            <Header
                categories={categories}
                title={title}
            />
            <MainPosts
                banners={banners}
                latestPosts={latestPosts}
                featuredPosts={featuredPosts}
                highlightPosts={highlightPosts}
                choicePost={choicePost}
                popularPosts={popularPosts}
            />
            <Footer />
        </>
    );
}

export default Posts;
