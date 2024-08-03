import React from "react";
import PostItemFeaturedImageBox from "./PostItemFeaturedImageBox";
import PostItemFeaturedTextBox from "./PostItemFeaturedTextBox";

const PostItemFeatured = ({ post }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
                <PostItemFeaturedImageBox
                    {...post}
                    lang={currentLanguage}
                />
                <PostItemFeaturedTextBox
                    {...post}
                    lang={currentLanguage}
                />
            </div>
        </div>
    );
}

export default PostItemFeatured;
