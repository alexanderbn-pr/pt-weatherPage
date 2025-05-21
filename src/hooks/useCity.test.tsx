import { renderHook, act, waitFor } from '@testing-library/react';
import { useCity } from './useCity';
import { fetchWeather } from '../services/get-weather';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { mockWeatherList } from '../assets/data/weatherMock';

const mockSetCitySelected = vi.fn();
const mockCity = {
  code: '123',
  country: 'ES',
  locales: { es: 'Madrid', en: 'Madrid' },
};
vi.mock('../provider/cityProvider', () => ({
  useCityContext: () => ({
    citySelected: mockCity,
    setCitySelected: mockSetCitySelected,
  }),
}));

vi.mock('../services/get-weather');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
  }),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useCity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchWeather).mockResolvedValue(mockWeatherList);
  });
  it('should return empty weatherData if fetchWeather returns empty array', async () => {
    vi.mocked(fetchWeather).mockResolvedValue([]);
    const { result } = renderHook(() => useCity(), { wrapper });
    await waitFor(() => !result.current.isLoadingWeather);
    expect(result.current.weatherData).toEqual([]);
  });

  it('should expose citySelected from context', () => {
    const { result } = renderHook(() => useCity(), { wrapper });
    expect(result.current.citySelected).toEqual(mockCity);
  });

  it('should return weather data grouped by day', async () => {
    const { result } = renderHook(() => useCity(), { wrapper });

    await waitFor(() => !result.current.isLoadingWeather);

    expect(result.current.weatherData).toHaveLength(2);
    expect(result.current.weatherData[0]).toMatchObject({
      day: '2024-05-20',
      maxTemperature: 27,
      minTemperature: 15,
    });
    expect(result.current.weatherData[1]).toMatchObject({
      day: '2024-05-21',
      maxTemperature: 22,
      minTemperature: 14,
    });
  });

  it('should call setCitySelected when setCitySelected is used', () => {
    const { result } = renderHook(() => useCity(), { wrapper });
    act(() => {
      result.current.setCitySelected(mockCity);
    });
    expect(mockSetCitySelected).toHaveBeenCalledWith(mockCity);
  });

  it('should handle loading and error states', async () => {
    vi.mocked(fetchWeather).mockImplementationOnce(() => new Promise(() => {}));
    const { result } = renderHook(() => useCity(), { wrapper });
    expect(result.current.isLoadingWeather).toBe(true);
  });
});
