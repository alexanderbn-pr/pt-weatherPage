import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './contact';
import en from '../../locales/en.json';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, any>) => {
      const translations: Record<string, string> = {
        'contact.title': en.contact.title,
        'contact.subtitle': en.contact.subtitle,
        'contact.name': en.contact.name,
        'contact.email': en.contact.email,
        'contact.birth': en.contact.birth,
        'contact.phone': en.contact.phone,
        'contact.submit': en.contact.submit,
        'contact.success': `Message sent successfully from ${params?.name}!`,
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'en',
    },
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn((path) => path),
}));

vi.mock('../../provider/cityProvider', () => ({
  useCityContext: () => ({
    setCitySelected: vi.fn(),
  }),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the contact page', () => {
    render(<Contact />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(
      screen.getByText('Write to us and we will reply as soon as possible'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('displays form validation errors when submitting with empty fields', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    user.click(screen.getByText('Send'));
    expect(screen.queryByText(/Thank you/i)).not.toBeInTheDocument();
  });

  it('submits the form successfully and shows success message and reset the inputs', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/Full Name/i), 'Alexander Bosch');
    await user.type(screen.getByLabelText(/Email/i), 'alex@gmail.com');
    await user.type(screen.getByLabelText(/Date of birth/i), '1996-02-15');
    await user.type(screen.getByLabelText(/Phone/i), '6363663636');
    let buttonSend = screen.getByRole('button', { name: 'Send' });
    expect(buttonSend).toBeInTheDocument();
    user.click(buttonSend);
    await waitFor(() => {
      expect(
        screen.getByText(/Message sent successfully from Alexander Bosch!/i),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Email/i)).toHaveValue('');
      expect(screen.getByLabelText(/Date of birth/i)).toHaveValue('');
      expect(screen.getByLabelText(/Phone/i)).toHaveValue('');
    });
  });
});
