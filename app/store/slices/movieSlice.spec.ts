import movieReducer, {
  setMovies,
  selectMovie,
  setBookingDate,
  setBookingTime,
  toggleSeat,
  clearSeats,
} from "./movieSlice";
import { Movie } from "../../types/type";

const mockMovie: Movie = {
  id: "1",
  title: "Inception",
  rating: 8.8,
  duration: "2hrs",
  image: "https://example.com/inception.jpg",
  description: "A thief who steals corporate secrets.",
};

const anotherMovie: Movie = {
  id: "2",
  title: "Interstellar",
  rating: 8.6,
  duration: "2hrs 49m",
  image: "https://example.com/interstellar.jpg",
  description: "A team of explorers travel through a wormhole.",
};

describe("movieSlice", () => {
  const initialState = {
    movies: [],
    selectedMovie: null,
    bookingDate: null,
    bookingTime: null,
    selectedSeats: [],
  };

  it("should return the initial state", () => {
    expect(movieReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("setMovies", () => {
    it("should set the movies list", () => {
      const state = movieReducer(undefined, setMovies([mockMovie, anotherMovie]));
      expect(state.movies).toHaveLength(2);
      expect(state.movies[0]).toEqual(mockMovie);
    });

    it("should overwrite the existing movies list", () => {
      let state = movieReducer(undefined, setMovies([mockMovie]));
      state = movieReducer(state, setMovies([anotherMovie]));
      expect(state.movies).toHaveLength(1);
      expect(state.movies[0]).toEqual(anotherMovie);
    });
  });

  describe("selectMovie", () => {
    it("should set the selected movie", () => {
      const state = movieReducer(undefined, selectMovie(mockMovie));
      expect(state.selectedMovie).toEqual(mockMovie);
    });

    it("should clear the selected movie when null is passed", () => {
      let state = movieReducer(undefined, selectMovie(mockMovie));
      state = movieReducer(state, selectMovie(null));
      expect(state.selectedMovie).toBeNull();
    });
  });

  describe("setBookingDate", () => {
    it("should set the booking date", () => {
      const state = movieReducer(undefined, setBookingDate("2025-06-01"));
      expect(state.bookingDate).toBe("2025-06-01");
    });

    it("should clear the booking date when null is passed", () => {
      let state = movieReducer(undefined, setBookingDate("2025-06-01"));
      state = movieReducer(state, setBookingDate(null));
      expect(state.bookingDate).toBeNull();
    });
  });

  describe("setBookingTime", () => {
    it("should set the booking time", () => {
      const state = movieReducer(undefined, setBookingTime("7:00 PM"));
      expect(state.bookingTime).toBe("7:00 PM");
    });

    it("should clear the booking time when null is passed", () => {
      let state = movieReducer(undefined, setBookingTime("7:00 PM"));
      state = movieReducer(state, setBookingTime(null));
      expect(state.bookingTime).toBeNull();
    });
  });

  describe("toggleSeat", () => {
    it("should add a seat when it is not selected", () => {
      const state = movieReducer(undefined, toggleSeat("A1"));
      expect(state.selectedSeats).toContain("A1");
    });

    it("should remove a seat when it is already selected", () => {
      let state = movieReducer(undefined, toggleSeat("A1"));
      state = movieReducer(state, toggleSeat("A1"));
      expect(state.selectedSeats).not.toContain("A1");
    });

    it("should allow multiple different seats to be selected", () => {
      let state = movieReducer(undefined, toggleSeat("A1"));
      state = movieReducer(state, toggleSeat("B2"));
      expect(state.selectedSeats).toEqual(["A1", "B2"]);
    });

    it("should only remove the toggled seat and leave others intact", () => {
      let state = movieReducer(undefined, toggleSeat("A1"));
      state = movieReducer(state, toggleSeat("B2"));
      state = movieReducer(state, toggleSeat("A1"));
      expect(state.selectedSeats).toEqual(["B2"]);
    });
  });

  describe("clearSeats", () => {
    it("should clear all selected seats", () => {
      let state = movieReducer(undefined, toggleSeat("A1"));
      state = movieReducer(state, toggleSeat("B2"));
      state = movieReducer(state, clearSeats());
      expect(state.selectedSeats).toEqual([]);
    });

    it("should handle clearSeats on an empty selection", () => {
      const state = movieReducer(undefined, clearSeats());
      expect(state.selectedSeats).toEqual([]);
    });
  });
});
