import React from "react";
import PostItemLatest from "./PostItemLatest";

const PostListLatest = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:gap-10">
            {posts.map(post => {
                return <PostItemLatest key={post.id} post={post} />
            })}
        </div>
    );
};

export default PostListLatest
