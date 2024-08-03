import React from "react";
import PostItemAsideTextBox from "./PostItemAsideTextBox";

const PostItemAside = ({ post, count }) => {
    return (
        <div className="flex gap-5 md:gap-8 lg:gap-5 mb-3 border-b-2 border-green-200 pb-3">
            <p className="text-green-500 text-4xl lg:text-4xl font-bold mt-5">{count}</p>
            <PostItemAsideTextBox
                {...post}
                categoryName={post.post_category.name}
                categorySlug={post.post_category.slug}
                authorName={post.user.name}
                authorUsername={post.user.username}
            />
        </div>
    );
}

export default PostItemAside;
