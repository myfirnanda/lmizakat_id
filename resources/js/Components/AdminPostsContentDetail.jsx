import { Link } from "@inertiajs/react";
import React from "react";
import getImage from "./getImage";
import getLocalDate from "./getLocalDate";

const AdminPostsContentDetail = ({ post }) => {
    return (
        <>
            <Link href={route('admin.posts.index')} className="underline text-blue-500">
                <i class="ri-arrow-left-double-line"></i>
                Kembali
            </Link>
            <h3 className=" mt-5 text-4xl text-black font-bold">{post.title}</h3>
            <table className="table-auto w-full my-5">
                <tr>
                    <td>Kategori: {post.post_category.name}</td>
                    <td>Diterbitkan: {getLocalDate(post.date, 'id')}</td>
                </tr>
            </table>
            <img
                src={getImage(post.image)}
                alt={post.title}
                className="h-96 w-full xl:w-4/5 object-cover mb-5"
            />
            <div
                dangerouslySetInnerHTML={{ __html: post.body }}
                className="text-lg text-black"
            />
        </>
    )
}

export default AdminPostsContentDetail;
