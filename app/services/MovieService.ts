import axios from "axios";
import { Movie } from "../types/type";

const MOVIE_DB_API = "https://api.movieposterdb.com/v1/random/movies";

export const movieService = {
  async getMovies(): Promise<Movie[]> {
    // Placeholder movies for development
    const placeholderMovies: Movie[] = [
      {
        id: "1",
        title: "Inception",
        genre: "Sci-Fi",
        rating: 8.8,
        duration: "148m",
        image: "/Movie Poster.png",
      },
      {
        id: "2",
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        duration: "152m",
        image: "/Movie Poster.png",
      },
      {
        id: "3",
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 8.6,
        duration: "169m",
        image: "/Movie Poster.png",
      },
      {
        id: "4",
        title: "Pulp Fiction",
        genre: "Crime",
        rating: 8.9,
        duration: "154m",
        image: "/Movie Poster.png",
      },
      {
        id: "5",
        title: "The Shawshank Redemption",
        genre: "Drama",
        rating: 9.3,
        duration: "142m",
        image: "/Movie Poster.png",
      },
      {
        id: "6",
        title: "Forrest Gump",
        genre: "Drama",
        rating: 8.8,
        duration: "142m",
        image: "/Movie Poster.png",
      },
    ];

    return placeholderMovies;
  },
};
