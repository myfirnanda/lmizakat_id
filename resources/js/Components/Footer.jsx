import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import React from "react";
import getImage from "./getImage.js";

const Footer = () => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';
    const [t] = useTranslation('global');

    return (
        <footer className="bg-green-600 w-full py-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 gap-10 pb-4">
                    <div className="col-span-12 lg:col-span-4 text-white">
                        <div className="flex items-center gap-5 text-3xl sm:text-2xl xl:text-3xl font-bold">
                            <img src={getImage('lmi-logo.png')} alt="Logo LMI" width="100" />
                            <h1>Lembaga Manajemen Infaq</h1>
                        </div>
                        <p>{t('footer.profileDescription')}</p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 mt-4">
                        <h4 className="text-3xl xl:text-xl font-bold text-white">{t('footer.links.headerServices')}</h4>
                        <ul className="list-unstyled flex flex-col gap-2 mt-4">
                            <li><a href="https://qurbanholic.lmizakat.id/" className="text-decoration-none text-white" target="_blank">Qurban</a></li>
                            <li><a href="https://infak.in/" className="text-decoration-none text-white" target="_blank">Infaq</a></li>
                            <li><a href="https://wakafo.org/" className="text-decoration-none text-white" target="_blank">Wakaf</a></li>
                            <li><a href="https://lmizakat.org/kal_zakat/" className="text-decoration-none text-white" target="_blank">{t('footer.links.zakatCalculator')}</a></li>
                        </ul>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 mt-4">
                        <h4 className="text-3xl xl:text-xl font-bold text-white" target="_blank">{t('footer.links.headerOtherInfo')}</h4>
                        <ul className="list-unstyled flex flex-col gap-2 mt-4" target="_blank">
                            <li><a href="https://www.youtube.com/watch?v=gQSq47bvk3U&ab_channel=LembagaManajemenInfaq" className="text-decoration-none text-white" target="_blank">{t('footer.links.institutionalProfile')}</a></li>
                            <li><Link href={route('magazines.index', currentLanguage)} className="text-decoration-none text-white" target="_blank">{t('footer.links.magazines')}</Link></li>
                            <li><a href="https://drive.google.com/file/d/1t7pK6oHN4NTu61WMhmpTI-oVIHJUugls/view" className="text-decoration-none text-white" target="_blank">{t('footer.links.fastingCalendar')}</a></li>
                            <li><a href="https://lmizakat.org/laporan_keuangan.html" className="text-decoration-none text-white" target="_blank">{t('footer.links.moneyReport')}</a></li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-4 mt-4">
                        <h4 className="text-3xl xl:text-xl font-bold text-white">{t('footer.links.headerContactUs')}</h4>
                        <div className="flex flex-col gap-2 mt-4 text-white">
                            <a href="https://maps.app.goo.gl/N3pcDVi7ViByH6du7" className="flex items-center gap-3" target="_blank">
                                <i className="fa-solid fa-location-dot"></i>
                                <p>{t('footer.links.address')}</p>
                            </a>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-envelope"></i>
                                <a href="mailto:someone@example.com">info@lmizakat.org</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-phone"></i>
                                <p>031-505 3883</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <a href="tel:+6282230000909">(+62) 822 3000 0909</a>
                            </div>
                        </div>
                        {/* <div className="row mt-4">
                            <div className="col-sm-2">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="col-sm-9">
                                <p>Jl. Barata Jaya XXII No.20 Surabaya - JawaTimur</p>
                            </div>
                            <div className="col-sm-2">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="col-sm-10">
                                <a href="mailto:someone@example.com">info@lmizakat.org</a>
                            </div>
                            <div className="col-sm-2">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="col-sm-10">
                                <p>031-505 3883</p>
                            </div>
                            <div className="col-sm-2">
                                <i className="fa-solid fa-mobile-screen"></i>
                            </div>
                            <div className="col-sm-10">
                                <a href="tel:+6282230000909">(+62) 822 3000 0909</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                <hr />
                <p className="text-center text-white pt-4">Copyright &copy; {new Date().getFullYear()}. Made with ❤️ by <a href="https://www.linkedin.com/in/mochammad-yoga-firnanda/" target="_blank" className="text-decoration-none text-white fw-bold">Firnanda</a>. Part of <a href="https://www.instagram.com/p/C2hF1i6pBWS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" className="text-decoration-none text-white fw-bold">MSIB6</a></p>
            </div>
        </footer>
    );
}

export default Footer;
