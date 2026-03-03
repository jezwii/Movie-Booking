import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/app/types/type";

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  bookingDate: string | null; // date picked for current booking
  bookingTime: string | null; // selected time slot
  selectedSeats: string[]; // e.g. ["A1","A2"]
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  bookingDate: null,
  bookingTime: null,
  selectedSeats: [],
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
    // store the chosen booking date (YYYY-MM-DD)
    setBookingDate: (state, action: PayloadAction<string | null>) => {
      state.bookingDate = action.payload;
    },
    setBookingTime: (state, action: PayloadAction<string | null>) => {
      state.bookingTime = action.payload;
    },
    toggleSeat: (state, action: PayloadAction<string>) => {
      const seat = action.payload;
      const idx = state.selectedSeats.indexOf(seat);
      if (idx === -1) {
        state.selectedSeats.push(seat);
      } else {
        state.selectedSeats.splice(idx, 1);
      }
    },
    clearSeats: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const {
  setMovies,
  selectMovie,
  setBookingDate,
  setBookingTime,
  toggleSeat,
  clearSeats,
} = movieSlice.actions;
export default movieSlice.reducer;
