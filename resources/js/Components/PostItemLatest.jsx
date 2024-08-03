import React from "react";
import PostItemLatestImageBox from "./PostItemLatestImageBox";
import PostItemLatestTextBox from "./PostItemLatestTextBox";

const PostItemLatest = ({ post }) => {
    return (
        <div className="flex items-center justify-between gap-5 sm:gap-12">
            <div className="col-span-5">
                <PostItemLatestTextBox
                    {...post}
                    categoryName={post.post_category.name}
                    categorySlug={post.post_category.slug}
                    authorName={post.user.name}
                    authorUsername={post.user.username}
                />
            </div>
            <div className="col-span-4">
                <PostItemLatestImageBox
                    {...post}
                />
            </div>
        </div>
    )
};

export default PostItemLatest
