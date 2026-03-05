import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import paymentReducer from "./slices/paymentSlice";
import bookingReducer from "./slices/bookingSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    payment: paymentReducer,
    bookings: bookingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
