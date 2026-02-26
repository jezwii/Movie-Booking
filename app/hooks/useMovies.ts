import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../services/MovieService";
import { setMovies } from "../store/slices/movieSlice";
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
        dispatch(setMovies(data));
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
