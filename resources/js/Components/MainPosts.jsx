import React from "react";
import SectionLatest from "./SectionLatest";
import SectionHighlight from "./SectionHighlight";
import SectionChoice from "./SectionChoice";
import SectionFeatured from "./SectionFeatured";
import SectionBanner from "./SectionBanner";

const MainPosts = ({ banners, latestPosts, popularPosts, featuredPosts, highlightPosts, choicePost }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    return (
        <main className="bg-white h-full">
            <div className='container mx-auto px-4'>
                <SectionBanner banners={banners} />
                {page && Number(page) > 1 ? null : (
                    <>
                        <SectionFeatured posts={featuredPosts} banners={banners} />
                        {choicePost ? <SectionChoice post={choicePost} /> : null}
                        <SectionHighlight posts={highlightPosts} />
                    </>
                )}
                <SectionLatest latestPosts={latestPosts} popularPosts={popularPosts} />
            </div>
        </main>
    );
}

export default MainPosts;
