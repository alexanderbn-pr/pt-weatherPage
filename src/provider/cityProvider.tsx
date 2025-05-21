import { createContext, useContext, useState } from 'react';
import { DEFAULT_CITIES } from '../constants';
import { type City } from '../types';

interface CityContextType {
  citySelected: City;
  setCitySelected: (city: City) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [citySelected, setCitySelected] = useState<City>(DEFAULT_CITIES[0]);
  return (
    <CityContext.Provider value={{ citySelected, setCitySelected }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error('useCityContext must be used within CityProvider');
  return ctx;
};
