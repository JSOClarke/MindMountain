import { Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { AppLayout } from './components/Layout/AppLayout';
import { Home } from './pages/Home';
import { CardTraining } from './pages/CardTraining';
import { History } from './pages/History';

function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardTraining />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}

export default App
