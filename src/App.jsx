import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TopAnime from './pages/TopAnime';
import AnimeDetail from './pages/AnimeDetail';
import EpisodeDetail from './pages/EpisodeDetail';
import Genre from './pages/Genre';
import NotFound from './pages/NotFound';
import Layout from './Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="top-anime" element={<TopAnime />} />
          <Route path="ver/:animeName" element={<AnimeDetail />} />
          <Route path="ver/:animeName/:episodeNumber" element={<EpisodeDetail />} />
          <Route path="genero/:genreName/*" element={<Genre />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;