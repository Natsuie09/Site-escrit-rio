import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { RegionalPage } from './pages/RegionalPage';
import { LinksBioPage } from './pages/LinksBioPage';
import { ScrollBronzeBackground } from './components/ScrollBronzeBackground';

function App() {
  return (
    <HashRouter>
      <ScrollBronzeBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advogado-em/:slug" element={<RegionalPage />} />
        <Route path="/links" element={<LinksBioPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
