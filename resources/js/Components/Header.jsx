import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import getImage from "./getImage";


const Header = ({ categories, title }) => {
    const [t, i18n] = useTranslation('global');

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <header>
            <Head title={title} />
            <div className="absolute bg-white w-full z-30" id="navbar">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <Link
                            href={route("posts.index", currentLanguage)}
                            className="logo"
                        >
                        <img src={getImage('lmi-logo.png')} alt="Logo LMI" width="100" />
                        </Link>
                        <ul className="nav-links items-center gap-5 hidden md:flex">
                            {categories ? (
                                categories.map((category) => (
                                    <li
                                        key={category.id} className="text-green-600 font-semibold text-lg"
                                    >
                                    <Link
                                        href={route("categories.show", {
                                            'lang': currentLanguage,
                                            'slug': category.slug
                                        })}
                                    >
                                        {category.name}
                                    </Link>
                                    </li>
                                ))
                            ) : (
                                "No categories"
                            )}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost text-green-600 text-lg ml-2">
                                    {t('header.category.service')}

                                </div>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
                                    <li><a href="https://qurbanholic.lmizakat.id/" target="_blank">Qurban</a></li>
                                    <li><a href="https://infak.in/" target="_blank">Infaq</a></li>
                                    <li><a href="https://wakafo.org/" target="_blank">Wakaf</a></li>
                                </ul>
                            </div>
                        </ul>
                        <div className="flex gap-5">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost text-green-600 text-lg">
                                    {t('header.rightSide.language')}
                                </div>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
                                    <li>
                                        <Link
                                            href={route('posts.index', "id")}
                                            onClick={() => handleChangeLanguage("id")}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/2560px-Flag_of_Indonesia.svg.png" className="border-2 border-black"
                                                width="50"
                                            /> Indonesia
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route('posts.index', "en")}
                                            onClick={() => handleChangeLanguage("en")}>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
                                                className="border-2 border-black"
                                                width="50"
                                            />English
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="inline md:hidden">
                                <div className="btn btn-circle btn-ghost text-green-600 text-lg" id="hamburger">
                                    <i className="fa-solid fa-bars"></i>
                                </div>
                            </div>
                            <div id="search" className="hidden md:inline">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost text-green-600 text-lg">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="p-3 shadow menu dropdown-content z-[1] bg-white rounded-box w-80 gap-1">
                                        <label htmlFor="search">{t('header.rightSide.searchLabel')}:</label>
                                        <div className="flex gap-3">
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                                                id="grid-last-name"
                                                type="text"
                                                placeholder={t('header.rightSide.searchPlaceholder')}
                                                name="search"
                                                value={inputValue}
                                                onChange={handleChange}
                                            />
                                            <Link
                                                href={`/${currentLanguage}/posts?search=${inputValue}`}
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                {t('header.rightSide.searchButton')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="fixed md:hidden bg-white h-full w-72 p-4 z-50" id="sidebar">
                <div className="top flex justify-between items-center p-2 pb-4">
                    <div className="logo gap-2">
                        <img src={getImage('lmi-logo.png')} alt="Logo LMI" width="100" />
                        <h1 className="text-2xl font-bold text-black">Lembaga Manajemen Infaq</h1>
                    </div>
                </div>
                <div className="ml-2">
                    <ul>
                        {categories ? (
                            categories.map((category) => (
                                <li
                                    key={category.id} className="text-green-600 font-semibold text-lg mb-3"
                                >
                                <Link
                                    href={route("categories.show", {
                                        'lang': currentLanguage,
                                        'slug': category.slug
                                    })}
                                >
                                    {category.name}
                                </Link>
                                </li>
                            ))
                        ) : (
                            "No categories"
                        )}
                    </ul>
                </div>
                <div>
                    <div className="flex gap-3">
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                            id="grid-last-name"
                            type="text"
                            placeholder={t('header.rightSide.searchPlaceholder')}
                            name="search"
                            value={inputValue}
                            onChange={handleChange}
                        />
                        <Link
                            href={`/${currentLanguage}/posts?search=${inputValue}`}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" id="search-btn"
                        >
                            {t('header.rightSide.searchButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
