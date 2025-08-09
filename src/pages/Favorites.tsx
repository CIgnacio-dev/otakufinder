// src/pages/Favorites.tsx
import { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { getFavorites } from "../services/favoritesService";
import type { Anime } from "../services/animeService";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes animes en favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map(anime => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
