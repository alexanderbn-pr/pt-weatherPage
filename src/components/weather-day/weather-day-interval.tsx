import { type Weather } from '../../types';
import { useTranslation } from 'react-i18next';
import { DEGREE_SUFIX } from '../../constants';

interface Props {
  intervalWeather: Weather[];
}
function WeatherDayInterval({ intervalWeather }: Props) {
  const { t } = useTranslation();

  return (
    <table className="weather-day-interval" aria-label="Tabla del tiempo">
      <thead>
        <tr>
          <th></th>
          <th>{t('weather.interval.description')}</th>
          <th>{t('weather.interval.temperature')}</th>
          <th>{t('weather.interval.probability')}</th>
          <th>{t('weather.interval.wind')}</th>
        </tr>
      </thead>
      <tbody>
        {intervalWeather.map((interval) => {
          const intervalHour: string = interval.dt_txt
            .split(' ')[1]
            .split(':')[0];
          const parseInterval: string = `${intervalHour} h - ${
            parseInt(intervalHour) + 3
          } h`;
          return (
            <tr key={interval.dt}>
              <td>{parseInterval}</td>
              <td>
                <div className="weather-day-interval-description">
                  <p>{interval.weather[0].description}</p>
                  <img
                    alt="weather-icon"
                    src={`https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`}
                    style={{ width: 40, height: 40 }}
                  />
                </div>
              </td>
              <td>
                {interval.main.temp.toFixed(0)}
                {DEGREE_SUFIX}
              </td>
              <td>{interval.pop * 100} %</td>
              <td>{interval.wind.speed} m/s</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default WeatherDayInterval;
