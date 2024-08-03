import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import MainPost from "@/Components/MainPost";
import React from "react";

const Post = ({ title, categories, post, popularPosts, relatedPosts }) => {
    return (
        <>
            <Header
                title={title}
                categories={categories}
            />
            <MainPost
                popularPosts={popularPosts}
                relatedPosts={relatedPosts}
                {...post}
            />
            <Footer />
        </>
    )
}

export default Post;
