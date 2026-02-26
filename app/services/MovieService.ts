import { Movie } from "../types/type";
import { request } from "./httpService";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3/movie/popular";

export const movieService = {
  async getMovies(): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve) => {
      if (!TMDB_API_KEY) {
        console.error("TMDB API key is not set in environment variables.");
        resolve([]);
        return;
      }

      const url = `${TMDB_API_URL}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

      request(
        "GET",
        url,
        (data: any) => {
          try {
            const movies: Movie[] = (data.results || []).map((movie: any) => ({
              id: movie.id.toString(),
              title: movie.title,

              rating: movie.vote_average,
              duration: "2hrs",
              image: movie.poster_path
                ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                : "",
              description: movie.overview || "No description available.",
            }));
            resolve(movies);
          } catch (err) {
            console.error("Error parsing movie data:", err);
            resolve([]);
          }
        },
        (err: any) => {
          console.error("Failed to fetch movies from TMDB:", err);
          resolve([]);
        },
      );
    });
  },
};
