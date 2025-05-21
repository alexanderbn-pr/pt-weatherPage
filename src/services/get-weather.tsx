import { Weather } from '../types';
export const fetchWeather = async (
  name?: string,
  country?: string,
  language: string = 'en',
): Promise<Weather[]> => {
  if (!name || !country) return [];
  return await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${name},${country}&units=metric&lang=${language}&appid=774f59b8468d23c6d5d9173e4818462d`,
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener los libros');
      return res?.json();
    })
    .then((data) => {
      return data.list ?? [];
    });
};
