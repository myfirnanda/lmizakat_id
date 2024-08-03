import React from "react";
import PostItemRelated from "./PostItemRelated";

const PostListRelated = ({ posts }) => {
    return (
        <div className="grid grid-cols-12 gap-8 sm:gap-6 md:gap-4">
            {posts ? posts.map(post => {
                return <PostItemRelated key={post.id} {...post} />
            }) : null}
        </div>
    );
}

export default PostListRelated;
