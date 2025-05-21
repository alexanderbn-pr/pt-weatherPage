import './login.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type UserParams } from '../../types';
import { DEFAULT_USER } from '../../constants';
import Footer from '../../components/footer/footer';

function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userParams, setUserParams] = useState<UserParams>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (userParams) {
      if (
        userParams.password === DEFAULT_USER.password &&
        userParams.userName === DEFAULT_USER.userName
      ) {
        navigate('/weather');
      } else {
        setErrorMessage(t('login.invalidData'));
      }
    }
  }, [userParams, i18n.language]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getValue = (fd: FormData, key: string) => {
      const value = fd.get(key);
      return typeof value === 'string' ? value.trim() : '';
    };
    const userName = getValue(formData, 'username')?.toString().trim() ?? '';
    const password = getValue(formData, 'password')?.toString().trim() ?? '';

    if (!userName || !password) return;

    const newParamsUser: UserParams = { userName, password };
    setUserParams(newParamsUser);
  };

  return (
    <>
      <main>
        <section className="login">
          <h1>{t('login.title')}</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-row">
              <label htmlFor="username">{t('login.username')}</label>
              <input required type="email" id="username" name="username" />
            </div>
            <div className="login-form-row">
              <label htmlFor="password">{t('login.password')}</label>
              <input required type="password" id="password" name="password" />
            </div>
            <p
              className="login-error"
              style={{ visibility: errorMessage ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </p>
            <button type="submit">{t('login.submit')}</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
