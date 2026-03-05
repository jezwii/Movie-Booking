"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";

interface CheckoutFormProps {
  movieTitle: string;
  movieImage: string;
  movieId: string | number;
  bookingDate: string;
  bookingTime: string;
  selectedSeats: string[];
  totalAmount: number;
}

export default function CheckoutForm({
  movieTitle,
  movieImage,
  movieId,
  bookingDate,
  bookingTime,
  selectedSeats,
  totalAmount,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Encode all booking details into the return URL as query params
    const params = new URLSearchParams({
      movieTitle,
      movieImage,
      movieId: String(movieId),
      bookingDate,
      bookingTime,
      seats: selectedSeats.join(","),
      amount: String(totalAmount),
    });

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?${params.toString()}`,
      },
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" variant="contained" sx={{ mt: 2, flex: 1 }}>
        Pay Now
      </Button>
    </form>
  );
}
