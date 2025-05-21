import { type Weather } from '../../types.d';
export const mockWeatherList: Weather[] = [
  {
    dt: 1716206400,
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 15,
      temp_max: 25,
      pressure: 1012,
      humidity: 60,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: {
      speed: 3.5,
      deg: 180,
    },
    pop: 0,
    dt_txt: '2024-05-20 12:00:00',
  },
  {
    dt: 1716217200,
    main: {
      temp: 22,
      feels_like: 21,
      temp_min: 16,
      temp_max: 27,
      pressure: 1010,
      humidity: 55,
    },
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'few clouds',
        icon: '02d',
      },
    ],
    wind: {
      speed: 4.0,
      deg: 190,
    },
    pop: 0.1,
    dt_txt: '2024-05-20 15:00:00',
  },
  {
    dt: 1716292800,
    main: {
      temp: 18,
      feels_like: 17,
      temp_min: 14,
      temp_max: 22,
      pressure: 1008,
      humidity: 65,
    },
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
    wind: {
      speed: 2.5,
      deg: 200,
    },
    pop: 0.2,
    dt_txt: '2024-05-21 12:00:00',
  },
];

export const mockWeather: Weather = {
  dt: 1716206406,
  main: {
    temp: 12,
    feels_like: 12,
    temp_min: 12,
    temp_max: 15,
    pressure: 1012,
    humidity: 60,
  },
  weather: [
    {
      id: 800,
      main: 'Rain',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.5,
    deg: 180,
  },
  pop: 0,
  dt_txt: '2024-05-20 17:00:00',
};


