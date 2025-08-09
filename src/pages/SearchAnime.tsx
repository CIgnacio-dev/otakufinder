// src/pages/SearchAnime.tsx
import { useState } from 'react'
import { searchAnime } from '../services/animeService'
import type { Anime } from '../services/animeService'
import AnimeCard from '../components/AnimeCard'

export default function SearchAnime() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    try {
      const data = await searchAnime(query)
      setResults(data)
    } catch (error) {
      console.error('Error buscando animes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        OtakuFinder
      </h1>

      <div className="flex justify-center mb-8 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca un anime..."
          className="px-4 py-2 border rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-center">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  )
}
