import React from "react";
import PostItemFeatured from "./PostItemFeatured";

const PostListFeatured = ({ posts }) => {
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 h-full">
            {posts ?
                posts.slice(1).map(post => {
                    return <PostItemFeatured key={post.id} post={post} />
            }) : null}
        </div>
    )
}

export default PostListFeatured;
