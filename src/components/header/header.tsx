import './header.scss';
import { LANGUAGES } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/weather.png';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <h2>{t('header.title')}</h2>
      <div className="header-language">
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="header-language-select"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        {location.pathname !== '/login' && (
          <button className="header-button" onClick={() => handleLogout()}>
            {t('header.logout')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
