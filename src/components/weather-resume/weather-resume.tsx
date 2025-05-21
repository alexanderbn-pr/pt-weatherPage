import './weather-resume.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type WeatherDayType } from '../../types';
import WeatherDayList from '../weather-day/weather-dayList';
import WeatherDayInterval from '../weather-day/weather-day-interval';

interface Props {
  isLoading: boolean;
  isError: boolean;
  weatherData: WeatherDayType[];
  getWeather: () => void;
}
function WeatherResume({ isLoading, isError, weatherData, getWeather }: Props) {
  const { t } = useTranslation();
  const [daySelected, setDaySelected] = useState<WeatherDayType | undefined>();

  useEffect(() => {
    if (weatherData?.length > 0) {
      setDaySelected(weatherData[0]);
    }
  }, [weatherData]);
  return (
    <section className="weather">
      {!isLoading && !isError && weatherData?.length > 0 && (
        <WeatherDayList
          weatherDay={weatherData}
          setDaySelected={setDaySelected}
          daySelected={daySelected}
        />
      )}

      {!isLoading && !isError && daySelected?.intervalWeather && (
        <WeatherDayInterval intervalWeather={daySelected.intervalWeather} />
      )}

      {isLoading && (
        <p>
          <strong>{t('weather.loading')}</strong>
        </p>
      )}

      {isError && (
        <div className="characters-results">
          <p>{t('weather.error')}</p>
          <button
            onClick={() => {
              getWeather();
            }}
          >
            {t('weather.retry')}
          </button>
        </div>
      )}
    </section>
  );
}

export default WeatherResume;
