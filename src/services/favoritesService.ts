import type { Anime } from "./animeService";

const FAVORITES_KEY = "otakufinder_favorites";

export const getFavorites = (): Anime[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (anime: Anime) => {
  const favorites = getFavorites();
  if (!favorites.find(f => f.mal_id === anime.mal_id)) {
    favorites.push(anime);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: number) => {
  const favorites = getFavorites().filter(f => f.mal_id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().some(f => f.mal_id === id);
};
