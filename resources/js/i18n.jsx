import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import global_id from './translations/id/global.json';
import global_en from './translations/en/global.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'id',
        fallbackLng: 'en',
        resources: {
            id: {
                global: global_id,
            },
            en: {
                global: global_en,
            },
        },
    });

export default i18n;
