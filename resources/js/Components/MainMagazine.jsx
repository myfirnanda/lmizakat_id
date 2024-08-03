import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";
import getLocalDate from "./getLocalDate";
import getImage from "./getImage";

const MainMagazine = ({ image, title, description, release, link }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';
    const [t] = useTranslation('global');

    return (
        <main className="pt-[8rem] bg-white py-10">
            <div className='container mx-auto px-4'>
                <Link
                    href={route('magazines.index', currentLanguage)}
                    className="underline text-blue-500"
                >
                    <i className="ri-arrow-left-double-line"></i>
                    {t('main.magazines.back')}
                </Link>
                <div className="grid grid-cols-12 gap-10 mt-3">
                    <div className="col-span-12 md:col-span-5">
                        <img src={getImage(image)} alt={title} />
                    </div>
                    <div className="col-span-12 md:col-span-7 flex items-start justify-center flex-col">
                        <h3 className="text-4xl font-bold text-black line-clamp-2">
                        {title}</h3>
                        <p className="my-3">Diterbitkan: <span className="font-bold">{getLocalDate(release, currentLanguage, false)}</span></p>
                        <div
                            dangerouslySetInnerHTML={{ __html: description }}
                            className="text-lg"
                        />
                        <a href={link} className="mt-5" target="_blank">
                            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download</button>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainMagazine;
