import { UserParams, City, Language } from './types';
export const DEFAULT_USER: UserParams = {
  userName: 'admin@gmail.com',
  password: 'admin',
};

export const DEFAULT_CITIES: City[] = [
  {
    code: 'valencia',
    country: 'ES',
    locales: {
      en: 'Valencia',
      es: 'Valencia',
    },
  },
  {
    code: 'london',
    country: 'GB',
    locales: {
      en: 'London',
      es: 'Londres',
    },
  },
  {
    code: 'berlin',
    country: 'DE',
    locales: {
      en: 'Berlin',
      es: 'Berlín',
    },
  },
  {
    code: 'tokyo',
    country: 'JP',
    locales: {
      en: 'Tokyo',
      es: 'Tokio',
    },
  },
];

export const LANGUAGES: Language[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

export const DEGREE_SUFIX: string = 'ºC';
