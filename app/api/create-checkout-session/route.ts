import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const {
    totalAmount,
    movieTitle,
    movieImage,
    movieId,
    bookingDate,
    bookingTime,
    seats,
    ticketCount,
  } = await req.json();

  if (!totalAmount || totalAmount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${movieTitle} — Movie Tickets`,
            description: `${ticketCount} seat(s): ${seats} | ${bookingDate} ${bookingTime}`,
            images: movieImage ? [movieImage] : [],
          },
          unit_amount: totalAmount * 100, // paise
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/movies/payment/${movieId}`,
    // Store all booking details in Stripe session metadata
    metadata: {
      movieId: String(movieId),
      movieTitle,
      movieImage,
      bookingDate,
      bookingTime,
      seats,
      totalAmount: String(totalAmount),
    },
  });

  return NextResponse.json({ url: session.url });
}
