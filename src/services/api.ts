import type { MoviesResponse, MovieDetails, VideosResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "pt-BR",
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

export function getPopularMovies(page = 1): Promise<MoviesResponse> {
  return fetchFromApi<MoviesResponse>("/movie/popular", { page: String(page) });
}

export function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  return fetchFromApi<MoviesResponse>("/search/movie", { query, page: String(page) });
}

export function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchFromApi<MovieDetails>(`/movie/${id}`);
}

export function getMovieVideos(id: number): Promise<VideosResponse> {
  return fetchFromApi<VideosResponse>(`/movie/${id}/videos`);
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
