import './contact.scss';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCityContext } from '../../provider/cityProvider';
import { useNavigate } from 'react-router-dom';
import { type ContactParams, type City } from '../../types';
import { DEFAULT_CITIES } from '../../constants';
import SideBar from '../../components/sidebar/sidebar';

function Contact() {
  const { t } = useTranslation();
  const [contactUsers, setContactUsers] = useState<ContactParams | null>();
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const isFormValid = name && email && birth && phone;

  const { setCitySelected } = useCityContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (contactUsers) {
      setSuccess(t('contact.success', { name: contactUsers.name }));
      formRef.current?.reset();
      setContactUsers(null);
    }
  }, [contactUsers, t]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getValue = (fd: FormData, key: string) => {
      const value = fd.get(key);
      return typeof value === 'string' ? value.trim() : '';
    };

    const name = getValue(formData, 'name');
    const email = getValue(formData, 'email');
    const birth = getValue(formData, 'birth');
    const phone = getValue(formData, 'phone');

    const newItem: ContactParams = { name, email, phone, birth };
    setContactUsers(newItem);
  };

  const handleGoToWeath = (city: City) => {
    setCitySelected(city);
    navigate('/weather');
  };

  return (
    <>
      <SideBar
        cities={DEFAULT_CITIES}
        citySelected={null}
        setCitySelected={handleGoToWeath}
      />
      <main>
        <section className="contact">
          <h1>{t('contact.title')}</h1>
          <h3>{t('contact.subtitle')}</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">
              {t('contact.name')}{' '}
              <span className="contact-form-required">*</span>
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value.trim())}
            />
            <label htmlFor="email">
              {t('contact.email')}
              <span className="contact-form-required">*</span>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <label htmlFor="birth">
              {t('contact.birth')}{' '}
              <span className="contact-form-required">*</span>
            </label>
            <input
              required
              type="date"
              id="birth"
              name="birth"
              onChange={(e) => setBirth(e.target.value)}
            />
            <label htmlFor="phone">
              {t('contact.phone')}
              <span className="contact-form-required">*</span>
            </label>
            <input
              required
              type="tel"
              pattern="[0-9]*"
              id="phone"
              name="phone"
              inputMode="numeric"
              onChange={(e) => setPhone(e.target.value.trim())}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  '',
                );
              }}
            />
            <button disabled={!isFormValid} type="submit">
              {t('contact.submit')}
            </button>
          </form>
          {success && <div className="form-success">{success}</div>}
        </section>
      </main>
    </>
  );
}

export default Contact;
