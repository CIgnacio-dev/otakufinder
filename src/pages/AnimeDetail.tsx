import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeById } from "../services/animeService";
import type { Anime } from "../services/animeService";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeById(Number(id));
        setAnime(data);
        setFavorite(isFavorite(Number(id)));
      } catch (error) {
        console.error("Error cargando el anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  const toggleFavorite = () => {
    if (!anime) return;
    if (favorite) {
      removeFavorite(anime.mal_id);
      setFavorite(false);
    } else {
      addFavorite(anime);
      setFavorite(true);
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (!anime) return <p className="text-center mt-8">Anime no encontrado.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="md:w-1/3">
            <img
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido */}
          <div className="p-6 flex-1">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {anime.title}
            </h1>

            {/* Géneros */}
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres?.map((g) => (
                <span
                  key={g.mal_id}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              {anime.synopsis || "Sin sinopsis disponible."}
            </p>

            {/* Info */}
            <div className="mb-4">
              <p>
                <strong>Puntaje:</strong> {anime.score || "N/A"}
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded text-white font-medium transition ${
                  favorite
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {favorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              </button>
              {anime.url && (
                <a
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Ver en MyAnimeList
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
