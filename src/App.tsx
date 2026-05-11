import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { RegionalPage } from './pages/RegionalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advogado-em/:slug" element={<RegionalPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
