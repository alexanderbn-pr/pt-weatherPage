import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Weather from './pages/weather/weather';
import Header from './components/header/header';

import { CityProvider } from '../src/provider/cityProvider';

function App() {
  return (
    <CityProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </CityProvider>
  );
}

export default App;
