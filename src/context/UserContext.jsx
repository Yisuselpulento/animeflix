import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const readLS = (key, fallback) => {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => readLS("favorites", []));
  const [playlist, setPlaylist] = useState(() => readLS("playlist", []));
  const [user, setUser] = useState(() => readLS("user", null));

  useEffect(() => { try { localStorage.setItem("favorites", JSON.stringify(favorites)); } catch { /* noop */ } }, [favorites]);
  useEffect(() => { try { localStorage.setItem("playlist", JSON.stringify(playlist)); } catch { /* noop */ } }, [playlist]);
  useEffect(() => { try { localStorage.setItem("user", JSON.stringify(user)); } catch { /* noop */ } }, [user]);

  // Guarda solo lo necesario para renderizar una card.
  const pick = (anime) => ({
    _id: anime._id,
    name: anime.name,
    image: anime.image,
    score: anime.score ?? 0
  });

  const isFavorite = (id) => favorites.some(a => a._id === id);
  const toggleFavorite = (anime) => {
    setFavorites(prev =>
      prev.some(a => a._id === anime._id)
        ? prev.filter(a => a._id !== anime._id)
        : [...prev, pick(anime)]
    );
  };

  const isInPlaylist = (id) => playlist.some(a => a._id === id);
  const togglePlaylist = (anime) => {
    setPlaylist(prev =>
      prev.some(a => a._id === anime._id)
        ? prev.filter(a => a._id !== anime._id)
        : [...prev, pick(anime)]
    );
  };

  const register = (data) => setUser({ username: data.username, email: data.email });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider
      value={{
        favorites,
        playlist,
        user,
        isFavorite,
        toggleFavorite,
        isInPlaylist,
        togglePlaylist,
        register,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
