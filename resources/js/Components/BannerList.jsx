import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import getImage from "./getImage";

// import '../../css/slider.css';
// import '../../css/style.css';

const BannerList = ({ banners }) => {
    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
                clickable: true,
            }}
            spaceBetween={10}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={banners.length > 1}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-[30rem] rounded-xl"
        >
        {banners.map(banner => {
            return (
                <SwiperSlide>
                    <a href={banner.link}>
                        <div  className="image-zoom overflow-hidden margin-0 margin-auto">
                            <img
                                src={getImage(banner.image) ?? getImage('broken-image.png')}
                                className="absolute object-cover block h-full w-full "
                                alt={banner.title}
                            />
                        </div>
                        <h3 className="text-white text-3xl font-bold absolute bottom-0 p-16 line-clamp-2">
                            {banner.title}
                        </h3>
                    </a>
                </SwiperSlide>
            );
        })}
        </Swiper>
    )
}

export default BannerList;
