import React from "react";
import BannerList from "./BannerList";

const SectionBanner = ({ banners }) => {
    if (banners && banners.length < 1) {
        return null;
    }

    return (
        <section className="pt-[7rem]">
            <div className="col-span-12 lg:col-span-8 xl:col-span-12">
                <BannerList banners={banners} />
            </div>
        </section>
    );
}

export default SectionBanner;
