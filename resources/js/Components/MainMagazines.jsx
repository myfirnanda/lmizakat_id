import React from "react";
import MagazineList from "./MagazinesList";
import { useTranslation } from "react-i18next";

const MainMagazines = ({ magazines }) => {
    const [t] = useTranslation('global');
    return (
        <main className="pt-[8rem] bg-white">
            <div className='container mx-auto px-4'>
                <h3 className="text-4xl font-bold text-black text-center mt-5 mb-10">{t('main.magazines.list')}</h3>
                <MagazineList magazines={magazines} />
            </div>
        </main>
    )
}

export default MainMagazines;
