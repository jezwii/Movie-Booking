import { Movie } from "../../app/types/type";
import { request } from "./httpService";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3/movie";

interface TMDBMovieResponse {
  results: TMDBMovie[];
}

interface TMDBMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  overview: string;
  runtime?: number;
}

export const movieService = {
  async getMovies(): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve) => {
      if (!TMDB_API_KEY) {
        console.error("TMDB API key is not set in environment variables.");
        resolve([]);
        return;
      }

      const url = `${TMDB_API_URL}/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

      request(
        "GET",
        url,
        (data: TMDBMovieResponse) => {
          try {
            const movies: Movie[] = (data.results || []).map(
              (movie: TMDBMovie) => ({
                id: movie.id.toString(),
                title: movie.title,

                rating: movie.vote_average,
                duration: "2hrs",
                image: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                  : "",
                description: movie.overview || "No description available.",
              }),
            );
            resolve(movies);
          } catch (err) {
            console.error("Error parsing movie data:", err);
            resolve([]);
          }
        },
        (err: unknown) => {
          console.error("Failed to fetch movies from TMDB:", err);
          resolve([]);
        },
      );
    });
  },

  async getMovieById(id: string): Promise<Movie | null> {
    return new Promise<Movie | null>((resolve) => {
      if (!TMDB_API_KEY) {
        console.error("TMDB API key is not set in environment variables.");
        resolve(null);
        return;
      }

      const url = `${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}&language=en-US`;

      request(
        "GET",
        url,
        (data: TMDBMovie) => {
          try {
            const movie: Movie = {
              id: data.id.toString(),
              title: data.title,
              rating: data.vote_average,
              duration: data.runtime ? `${data.runtime}m` : "N/A",
              image: data.poster_path
                ? `https://image.tmdb.org/t/p/w1280${data.poster_path}`
                : "",
              description: data.overview || "No description available.",
            };
            resolve(movie);
          } catch (err) {
            console.error("Error parsing movie data:", err);
            resolve(null);
          }
        },
        (err: unknown) => {
          console.error("Failed to fetch movie from TMDB:", err);
          resolve(null);
        },
      );
    });
  },
  async searchMovies(query: string): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve) => {
      if (!TMDB_API_KEY) {
        console.error("TMDB API key is not set in environment variables.");
        resolve([]);
        return;
      }

      // Encode the query to handle spaces and special characters appropriately
      const encodedQuery = encodeURIComponent(query);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodedQuery}&page=1`;

      request(
        "GET",
        url,
        (data: TMDBMovieResponse) => {
          try {
            const movies: Movie[] = (data.results || []).map(
              (movie: TMDBMovie) => ({
                id: movie.id.toString(),
                title: movie.title,
                rating: movie.vote_average,
                duration: "2hrs", // The search API doesn't return runtime immediately
                image: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                  : "",
                description: movie.overview || "No description available.",
              }),
            );
            resolve(movies);
          } catch (err) {
            console.error("Error parsing movie data:", err);
            resolve([]);
          }
        },
        (err: unknown) => {
          console.error("Failed to fetch search results from TMDB:", err);
          resolve([]);
        },
      );
    });
  },
};
