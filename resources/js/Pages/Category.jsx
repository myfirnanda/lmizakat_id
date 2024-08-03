import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MainCategory from "@/Components/MainCategory";
import React from "react";

const Category = ({ title, categories, category, posts, popularPosts, latestPosts }) => {
    return (
        <>
            <div className="fixed h-full w-full top-0 left-0 z-40" id="overlay"></div>
            <Header
                title={title}
                categories={categories}
            />
            <MainCategory
                category={category}
                posts={posts}
                popularPosts={popularPosts}
                latestPosts={latestPosts}
            />
            <Footer />
        </>
    );
}

export default Category;
