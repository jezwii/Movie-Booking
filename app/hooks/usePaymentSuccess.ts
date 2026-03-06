import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addBooking } from "@/app/store/slices/bookingSlice";
import { getCheckoutSession } from "@/app/services/paymentService";

export interface BookingMeta {
  movieTitle: string;
  movieImage: string;
  movieId: string;
  bookingDate: string;
  bookingTime: string;
  seats: string;
  totalAmount: string;
}

export function usePaymentSuccess(sessionId: string | null) {
  const dispatch = useDispatch<AppDispatch>();
  const [meta, setMeta] = useState<BookingMeta | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    sessionId ? null : "No session Id found in url"
  );
  const savedRef = useRef(false);

  useEffect(() => {
    if (!sessionId) return;

    getCheckoutSession(sessionId)
      .then(({ status, metadata }) => {
        if (status !== "paid") {
          setFetchError(`Payment status: ${status}. Please contact support.`);
          return;
        }

        const bookingMeta = metadata as unknown as BookingMeta;
        setMeta(bookingMeta);

        if (!savedRef.current) {
          savedRef.current = true;
          dispatch(
            addBooking({
              id: sessionId,
              movieTitle: bookingMeta.movieTitle,
              movieImage: bookingMeta.movieImage,
              bookingDate: bookingMeta.bookingDate,
              bookingTime: bookingMeta.bookingTime,
              seats: bookingMeta.seats ? bookingMeta.seats.split(",") : [],
              totalAmount: Number(bookingMeta.totalAmount),
              bookedAt: new Date().toISOString(),
            })
          );
        }
      })
      .catch(() => setFetchError("Failed to load booking details."));
  }, [sessionId, dispatch]);

  return { meta, fetchError };
}
