import React from "react";
import PostCard from "./PostCard";

const PostListCard = ({ posts }) => {
    const postsData = posts.data;
    return (
        <div className="grid grid-cols-12 gap-10">
            {postsData ? (
                postsData.map(post => <PostCard key={post.id} {...post} />)
            ) : ""}
        </div>
    );
}

export default PostListCard;
