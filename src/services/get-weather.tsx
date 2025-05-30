import { Weather } from '../types';
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (
  name?: string,
  country?: string,
  language: string = 'en',
): Promise<Weather[]> => {
  if (!name || !country) return [];
  return await fetch(
    `${WEATHER_API_URL}?q=${name},${country}&units=metric&lang=${language}&appid=${WEATHER_API_KEY}`,
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener los libros');
      return res?.json();
    })
    .then((data) => {
      return data.list ?? [];
    });
};
