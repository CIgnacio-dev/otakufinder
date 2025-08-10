import { useState } from "react";
import { searchAnime, type Anime } from "../services/animeService";
import AnimeCard from "../components/AnimeCard";

export default function SearchAnime() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchAnime(query);
      setResults(data);
    } catch (error) {
      console.error("Error buscando animes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 drop-shadow-sm">
        OtakuFinder
      </h1>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-8 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca un anime..."
          className="px-4 py-2 border rounded-lg w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {/* Sin resultados */}
      {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron animes para "{query}".
        </p>
      )}
    </div>
  );
}
