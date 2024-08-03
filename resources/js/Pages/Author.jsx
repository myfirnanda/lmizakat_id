import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MainAuthor from "@/Components/MainAuthor";
import React from "react";

const Author = ({ author, title, categories, posts }) => {
    return (
        <>
            <div className="fixed h-full w-full top-0 left-0 z-40" id="overlay"></div>
            <Header
                title={title}
                categories={categories}
            />
            <MainAuthor
                author={author}
                posts={posts}
            />
            <Footer />
        </>
    );
};

export default Author;
