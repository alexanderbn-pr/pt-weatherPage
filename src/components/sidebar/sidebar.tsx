import './sidebar.scss';
import { City } from '../../types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  citySelected: City | null;
  setCitySelected: (city: City) => void;
  cities: City[];
}
const SideBar = ({ citySelected, setCitySelected, cities }: SideBarProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <section>
        {cities.map((city) => (
          <button
            onClick={() => setCitySelected(city)}
            key={city.code}
            className={`${citySelected?.code === city.code ? 'selected' : ''}`}
          >
            {city.locales[i18n.language] ?? city.locales.en}
          </button>
        ))}
      </section>
      <button onClick={() => navigate('/contact')}>
        {t('navBar.contact')}
      </button>
    </aside>
  );
};

export default SideBar;
