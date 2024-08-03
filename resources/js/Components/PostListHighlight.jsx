import React from "react";
import PostItemHighlight from "./PostItemHighlight";

const PostListHighlight = ({ posts }) => {
    return (
        <div className="grid grid-cols-12 gap-4">
            {posts ?
                posts.map(post => {
                    return <PostItemHighlight key={post.id} post={post} />
                })
            : ''}
        </div>
    );
}

export default PostListHighlight;
