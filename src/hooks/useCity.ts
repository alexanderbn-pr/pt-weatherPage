import { useMemo, useCallback, useRef } from 'react';
import { useCityContext } from '../provider/cityProvider';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../services/get-weather';
import { type Weather, type City, type WeatherDayType } from '../types';
import { DEFAULT_CITIES } from '../constants';

export const useCity = () => {
  const { citySelected, setCitySelected } = useCityContext();
  const { i18n } = useTranslation();
  const cities = useRef<City[]>(DEFAULT_CITIES);
  const {
    data: responseFetch,
    isLoading: isLoadingWeather,
    isError: isWeatherError,
    refetch: fetchWeatherData,
  } = useQuery<Weather[]>({
    queryKey: ['locations', citySelected?.code, i18n.language],
    queryFn: () =>
      fetchWeather(citySelected?.code, citySelected?.country, i18n.language),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const weatherData: WeatherDayType[] = useMemo(() => {
    if (!responseFetch) return [];
    const groupedByDay: Record<string, Weather[]> = {};
    responseFetch.forEach((item) => {
      const day = item.dt_txt.split(' ')[0];
      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }
      groupedByDay[day].push(item);
    });
    //Documentar sobre el Object.entries
    // Es mejor un map que un foreach porque evito crear un array vacío y hacer push

    return Object.entries(groupedByDay).map(([key, dayArray]) => ({
      day: key,
      intervalWeather: dayArray,
      maxTemperature: Math.max(...dayArray.map((d) => d.main.temp_max)),
      minTemperature: Math.min(...dayArray.map((d) => d.main.temp_min)),
    }));
  }, [responseFetch]);

  const handleSetCitySelected = useCallback(
    (city: City) => setCitySelected(city),
    [],
  );

  return {
    getWeather: fetchWeatherData,
    citySelected,
    setCitySelected: handleSetCitySelected,
    isLoadingWeather,
    isWeatherError,
    weatherData,
    cities: cities.current,
  };
};
