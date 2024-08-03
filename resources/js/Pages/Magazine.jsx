import React from "react";
import MainMagazine from "@/Components/MainMagazine";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const Magazine = ({ title, categories, magazine }) => {
    return (
        <>
            <div className="fixed h-full w-full top-0 left-0 z-40" id="overlay"></div>
            <Header
                title={title}
                categories={categories}
            />
            <MainMagazine {...magazine}
            />
            <Footer/>
        </>
    );
}

export default Magazine;
