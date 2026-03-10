import bookingReducer, { addBooking, clearBookings } from "./bookingSlice";
import { Booking } from "../../types/type";

const mockBooking: Booking = {
  id: "session-abc",
  movieTitle: "Inception",
  movieImage: "https://example.com/inception.jpg",
  bookingDate: "2025-06-01",
  bookingTime: "7:00 PM",
  seats: ["A1", "A2"],
  totalAmount: 500,
  bookedAt: "2025-06-01T13:00:00.000Z",
};

const anotherBooking: Booking = {
  id: "session-xyz",
  movieTitle: "Interstellar",
  movieImage: "https://example.com/interstellar.jpg",
  bookingDate: "2025-06-10",
  bookingTime: "9:30 PM",
  seats: ["C3"],
  totalAmount: 250,
  bookedAt: "2025-06-02T08:00:00.000Z",
};

describe("bookingSlice", () => {
  const initialState = { bookings: [] };

  it("should return the initial state", () => {
    expect(bookingReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("addBooking", () => {
    it("should add a booking to an empty list", () => {
      const state = bookingReducer(undefined, addBooking(mockBooking));
      expect(state.bookings).toHaveLength(1);
      expect(state.bookings[0]).toEqual(mockBooking);
    });

    it("should prepend new bookings (unshift) so the latest is first", () => {
      let state = bookingReducer(undefined, addBooking(mockBooking));
      state = bookingReducer(state, addBooking(anotherBooking));
      expect(state.bookings).toHaveLength(2);
      expect(state.bookings[0]).toEqual(anotherBooking);
      expect(state.bookings[1]).toEqual(mockBooking);
    });
  });

  describe("clearBookings", () => {
    it("should remove all bookings", () => {
      let state = bookingReducer(undefined, addBooking(mockBooking));
      state = bookingReducer(state, addBooking(anotherBooking));
      state = bookingReducer(state, clearBookings());
      expect(state.bookings).toHaveLength(0);
    });

    it("should handle clearBookings on an empty list", () => {
      const state = bookingReducer(undefined, clearBookings());
      expect(state.bookings).toEqual([]);
    });
  });
});
