import React from "react";
import getImage from "./getImage";
import { Link } from "@inertiajs/react";

const AuthorProfile = ({
    image,
    name,
    description,
    social_link_facebook,
    social_link_instagram,
    social_link_linkedin,
    social_link_twitter,
    social_link_youtube
}) => {
    return (
        <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1 flex">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl text-center md:text-left font-bold text-black mb-5 sm:mb-0">{name}</h2>
                    <p className="text-center mt-1 md:text-left">{description}</p>
                    <div className="flex justify-center md:justify-start mt-5">
                        <div className="flex items-center justify-between gap-3 md:w-2/5 text-xl" id="social-links">
                            {social_link_facebook ?
                                <Link
                                    to={social_link_facebook}
                                    className="bg-green-500 py-2 px-4 rounded-full text-white"
                                    target="_blank"
                                >
                                    <button><i className="fa fa-facebook" aria-hidden="true"></i></button>
                                </Link>
                            : ''}
                            {social_link_instagram ?
                                <Link
                                    to={social_link_instagram}
                                    className="bg-green-500 py-2 px-3 rounded-full text-white"
                                    target="_blank"
                                >
                                    <button><i className="fa fa-instagram" aria-hidden="true"></i></button>
                                </Link>
                            : ''}
                            {social_link_linkedin ?
                                <Link
                                    to={social_link_linkedin}
                                    className="bg-green-500 py-2 px-[0.85rem] rounded-full text-white"
                                    target="_blank"
                                >
                                    <button><i className="fa fa-linkedin-square" aria-hidden="true"></i></button>
                                </Link>
                            : ''}
                            {social_link_youtube ?
                                <Link
                                    to={social_link_youtube}
                                    className="bg-green-500 py-2 px-[0.65rem] rounded-full text-white"
                                    target="_blank"
                                >
                                    <button><i className="fa fa-youtube-play" aria-hidden="true"></i></button>
                                </Link>
                            : ''}
                            {social_link_twitter ?
                                <Link
                                    to={social_link_twitter}
                                    className="bg-green-500 py-2 px-[0.75rem] rounded-full text-white"
                                    target="_blank"
                                >
                                    <button><i className="fa fa-twitter" aria-hidden="true"></i></button>
                                </Link>
                            : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex justify-center">
                <img
                    src={getImage(image) ?? `https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png`}
                    alt={name}
                    className="w-72 h-72 sm:w-96 sm:h-96 md:w-60 md:h-60 xl:w-80 xl:h-80 rounded-full object-cover object-center"
                />
            </div>
        </div>
    );
}

export default AuthorProfile;

