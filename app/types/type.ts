export interface Movie {
  id: string;
  title: string;
  rating: number;
  duration: string;
  image: string;
  description: string;
}

export interface Booking {
  id: string;          // unique ID (payment_intent or timestamp)
  movieTitle: string;
  movieImage: string;
  bookingDate: string;
  bookingTime: string;
  seats: string[];
  totalAmount: number;
  bookedAt: string;    // ISO timestamp
}
