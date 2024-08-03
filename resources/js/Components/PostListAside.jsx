import React from "react";
import PostItemAside from "./PostItemAside.jsx";

const PostListAside = ({ posts }) => {
    let count = 0;
    return (
        <div>
            {posts ? posts.map(post => {
                count++;
                return <PostItemAside key={post.id} post={post} count={count} />
            })
            : ''}
        </div>
    )
}

export default PostListAside;
