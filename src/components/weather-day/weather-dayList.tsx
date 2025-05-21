import './weather-day.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type WeatherDayType } from '../../types';
import { DEGREE_SUFIX } from '../../constants';

interface Props {
  weatherDay: WeatherDayType[];
  setDaySelected: React.Dispatch<
    React.SetStateAction<WeatherDayType | undefined>
  >;
  daySelected: WeatherDayType | undefined;
}
function WeatherDayList({ weatherDay, setDaySelected, daySelected }: Props) {
  const { t } = useTranslation();
  return (
    <div className="weather-day">
      {weatherDay.map((day) => (
        <article
          aria-label={`weather-day-${day.day}`}
          role="button"
          key={day.day}
          className={
            daySelected?.day === day?.day ? 'weather-day-selected' : ''
          }
          onClick={() => {
            setDaySelected(day);
          }}
        >
          <h3>
            {t('weather.day')} {day.day.substring(day.day.length - 2)}
          </h3>
          <div>
            <h4>
              {t('weather.min')}
              {day.minTemperature}
              {DEGREE_SUFIX}
            </h4>
            <h4>
              {t('weather.max')}
              {day.maxTemperature}
              {DEGREE_SUFIX}
            </h4>
          </div>
        </article>
      ))}
    </div>
  );
}

export default WeatherDayList;
