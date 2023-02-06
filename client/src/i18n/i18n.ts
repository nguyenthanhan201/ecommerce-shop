import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HEADER_EN from './en/header.json';
import HOME_EN from './en/home.json';
import PRODUCT_EN from './en/product.json';
import HEADER_VI from './vi/header.json';
import HOME_VI from './vi/home.json';
import PRODUCT_VI from './vi/product.json';

export const resources = {
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI,
    product: PRODUCT_VI
  }
} as const;

export const defaultNS = 'header';

i18n
  .use(initReactI18next)
  .init({
    resources,
    ns: ['header'],
    defaultNS,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false // react already safes from xss
    },
  });

export default i18n;