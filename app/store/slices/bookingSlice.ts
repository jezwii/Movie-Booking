import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/app/types/type";



interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    clearBookings: (state) => {
      state.bookings = [];
    },
  },
});

export const { addBooking, clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
