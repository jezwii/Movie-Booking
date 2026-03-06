import { request } from "./httpService";

export interface CheckoutSessionPayload {
  totalAmount: number;
  movieTitle: string;
  movieImage: string;
  movieId: string | number;
  bookingDate: string;
  bookingTime: string;
  seats: string;          // "A1,A2"
  ticketCount: number;
}

export const createCheckoutSession = (
  payload: CheckoutSessionPayload,
): Promise<{ url: string }> =>
  new Promise((resolve, reject) =>
    request<{ url: string }>(
      "POST",
      "/api/create-checkout-session",
      resolve,
      reject,
      {},
      "json",
      payload,
    )
  );

export const getCheckoutSession = (
  sessionId: string,
): Promise<{ status: string; metadata: Record<string, string> }> =>
  new Promise((resolve, reject) =>
    request<{ status: string; metadata: Record<string, string> }>(
      "GET",
      `/api/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`,
      resolve,
      reject,
    )
  );
