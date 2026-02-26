import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/app/types/type";

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },

    selectMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setMovies, selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
