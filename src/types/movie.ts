export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
  }
  
  export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: Genre[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }
  
  export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface VideosResponse {
    id: number;
    results: MovieVideo[];
  }
  