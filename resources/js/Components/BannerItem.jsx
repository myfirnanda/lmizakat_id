import React from "react";
import { SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";

import '../../css/slider.css'
import '../../css/style.css'
import getImage from "@/utils/getImage";

const BannerItem = ({ image, title, link }) => {
    return (
        <SwiperSlide>
            <>
                <div  className="image-zoom overflow-hidden margin-0 margin-auto">
                    <img
                        src={getImage(image)}
                        alt={title}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    />
                </div>
                <Link href={link}>
                    <h3 className="text-white text-2xl font-bold absolute bottom-0 p-16 line-clamp-2">
                        {title}
                    </h3>
                </Link>
            </>
        </SwiperSlide>
    );
};

export default BannerItem;
