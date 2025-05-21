import { type WeatherDayType } from '../../types';

export const mockWeatherParseMock: WeatherDayType[] = [
  {
    day: '2025-05-20',
    intervalWeather: [
      {
        dt: 1,
        main: {
          temp: 18,
          feels_like: 18,
          temp_min: 16,
          temp_max: 20,
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
          deg: 90,
        },
        pop: 0,
        dt_txt: '2025-05-20 09:00:00',
      },
      {
        dt: 2,
        main: {
          temp: 22,
          feels_like: 22,
          temp_min: 20,
          temp_max: 24,
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
          speed: 4.1,
          deg: 100,
        },
        pop: 0.1,
        dt_txt: '2025-05-20 12:00:00',
      },
    ],
    maxTemperature: 24,
    minTemperature: 16,
  },
  {
    day: '2025-05-21',
    intervalWeather: [
      {
        dt: 3,
        main: {
          temp: 19,
          feels_like: 19,
          temp_min: 17,
          temp_max: 21,
          pressure: 1008,
          humidity: 70,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        wind: {
          speed: 5.2,
          deg: 110,
        },
        pop: 0.5,
        dt_txt: '2025-05-21 09:00:00',
      },
    ],
    maxTemperature: 21,
    minTemperature: 17,
  },
];
