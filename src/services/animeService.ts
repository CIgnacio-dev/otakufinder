export interface Anime {
  mal_id: number;
  title: string;
  synopsis?: string;
  score?: number;
  url?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url?: string;
    };
  };
  genres?: { mal_id: number; name: string }[];
}


export async function searchAnime(query: string): Promise<Anime[]> {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
  const data = await response.json()
  return data.data // lista de animes
}

export const searchAnimes = async (query: string) => {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`
  );
  if (!res.ok) throw new Error("Error en la búsqueda");
  const data = await res.json();
  return data.data; // array de animes
};

export const getAnimeById = async (id: number) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) throw new Error("Error al obtener el anime");
  const data = await res.json();
  return data.data; // objeto con los datos del anime
};
