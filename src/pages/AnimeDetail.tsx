// src/pages/AnimeDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAnimeById } from '../services/animeService'

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>()
  const [anime, setAnime] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      try {
        const data = await getAnimeById(Number(id))
        setAnime(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <p className="p-4">Cargando...</p>
  if (!anime) return <p className="p-4">No se encontró el anime.</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{anime.title}</h1>
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full max-w-md mx-auto mb-4"
      />
      <p className="mb-4">{anime.synopsis}</p>
      <ul className="space-y-1 text-sm">
        <li><strong>Tipo:</strong> {anime.type}</li>
        <li><strong>Episodios:</strong> {anime.episodes || 'N/A'}</li>
        <li><strong>Estado:</strong> {anime.status}</li>
        <li><strong>Puntaje:</strong> {anime.score || 'N/A'}</li>
      </ul>
    </div>
  )
}
