import './weather.scss';
import { useCity } from '../../hooks/useCity';
import { useCityContext } from '../../provider/cityProvider';
import { City } from '../../types';
import SideBar from '../../components/sidebar/sidebar';
import WeatherResume from '../../components/weather-resume/weather-resume';

function Weather() {
  const { getWeather, isLoadingWeather, isWeatherError, weatherData, cities } =
    useCity();

  const { citySelected, setCitySelected } = useCityContext();

  const handleSelectCity = (city: City) => {
    if (citySelected.code.toLowerCase() !== city.code.toLowerCase()) {
      setCitySelected(city);
    }
  };

  return (
    <>
      <SideBar
        cities={cities}
        citySelected={citySelected}
        setCitySelected={handleSelectCity}
      />
      <main>
        <WeatherResume
          isLoading={isLoadingWeather}
          isError={isWeatherError}
          weatherData={weatherData}
          getWeather={getWeather}
        />
      </main>
    </>
  );
}

export default Weather;
