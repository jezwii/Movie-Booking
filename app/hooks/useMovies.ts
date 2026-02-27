import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../services/MovieService";
import { setMovies, selectMovie } from "../store/slices/movieSlice";
import { RootState } from "../store/store";

export const useMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await movieService.getMovies();
        dispatch(setMovies(data.slice(0, 6)));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movies.length === 0) {
      fetchMovies();
    }
  }, [dispatch, movies.length]);

  return { movies, loading, error };
};

export const useMovieDetails = (id: string | null) => {
  const dispatch = useDispatch();
  const currMovie = useSelector(
    (state: RootState) => state.movies.selectedMovie,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setLoading(true);
      try {
        const movieDetails = await movieService.getMovieById(id);
        if (movieDetails) {
          dispatch(selectMovie(movieDetails));
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [dispatch, id]);

  return { currMovie, loading, error };
};
