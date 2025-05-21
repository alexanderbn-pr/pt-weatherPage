import { toInteger } from 'lodash';

declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface UserParams {
  userName: string;
  password: string;
}

export interface City {
  code: string;
  country: string;
  locales: {
    [key: string]: string;
  };
}

export interface Weather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  pop: number; //Probabilidad de lluvia
  dt_txt: string;
}

export interface WeatherDayType {
  day: string;
  maxTemperature: number;
  minTemperature: number;
  intervalWeather: Weather[];
}

export interface ContactParams {
  name: string;
  email: string;
  phone: string;
  birth: string;
}

export interface Language {
  code: string;
  label: string;
}
