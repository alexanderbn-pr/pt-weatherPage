import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Weather from './weather';
import { CityProvider } from '../../provider/cityProvider';
import { DEFAULT_CITIES } from '../../constants';
import { mockWeatherParseMock } from '../../assets/data/weatherParseMock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithQueryClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={testQueryClient}>
        <CityProvider>{ui}</CityProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

const setCitySelected = vi.fn();
const getWeather = vi.fn();
vi.mock('../../hooks/useCity', () => ({
  useCity: () => ({
    getWeather: getWeather,
    isLoadingWeather: false,
    isWeatherError: false,
    weatherData: mockWeatherParseMock,
    cities: DEFAULT_CITIES,
  }),
}));

vi.mock('../../provider/cityProvider', () => ({
  CityProvider: ({ children }: { children: React.ReactNode }) => children,
  useCityContext: () => ({
    citySelected: {
      code: 'valencia',
      country: 'ES',
      locales: { en: 'Valencia', es: 'Valencia' },
    },
    setCitySelected: setCitySelected,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Weather', () => {
  beforeEach(() => {
    setCitySelected.mockClear();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Render the page of weather', async () => {
    renderWithQueryClient(<Weather />);
    await waitFor(() => {
      const city = screen.getByText(/Valencia/i);
      expect(city).toBeDefined();
      expect(city).toHaveClass('selected');
      expect(screen.getByText(/navBar.contact/i)).toBeDefined();
      expect(screen.queryByText(/weather.loading/i)).toBeNull();
      expect(screen.queryByText(/weather.error/i)).toBeNull();
      expect(
        screen.getByRole('table', { name: /tabla del tiempo/i }),
      ).toBeDefined();
    });
  });

  it('when click in other day sholud chage the data of table', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<Weather />);
    expect(screen.getByText(/weather.day 20/i)).toBeDefined();
    let day = screen.getByText(/weather.day 21/i);
    await user.click(day);
    await waitFor(() => {
      let daySelectedArticle = screen.getByRole('button', {
        name: /weather-day-2025-05-21/i,
      });
      expect(daySelectedArticle).toBeDefined();
      expect(daySelectedArticle).toHaveClass('weather-day-selected');
    });
  });

  it('Renderiza correctamente la página', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<Weather />);
    let city = screen.getByText(/London/i);
    await user.click(city);
    await waitFor(() => {
      expect(setCitySelected).toHaveBeenCalledWith({
        code: 'london',
        country: 'GB',
        locales: {
          en: 'London',
          es: 'Londres',
        },
      });
    });
  });

  it('when click in contact button call navigate of react-router', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<Weather />);
    const contactButton = screen.getByRole('button', {
      name: /navBar.contact/i,
    });
    await user.click(contactButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/contact');
    });
  });
});
