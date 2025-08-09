import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Anime } from "../services/animeService";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";

export default function AnimeCard({ anime }: { anime: Anime }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(anime.mal_id));
  }, [anime.mal_id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(anime.mal_id);
      setFavorite(false);
    } else {
      addFavorite(anime);
      setFavorite(true);
    }
  };

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="border rounded overflow-hidden cursor-pointer hover:shadow-lg transition relative"
    >
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
          favorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {favorite ? "❤️" : "🤍"}
      </button>
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h3 className="font-bold">{anime.title}</h3>
        <p className="text-sm">
          {anime.synopsis?.slice(0, 80) || "Sin descripción"}...
        </p>
      </div>
    </div>
  );
}
