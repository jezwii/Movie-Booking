export interface CheckoutSessionPayload {
  totalAmount: number;
  movieTitle: string;
  movieImage: string;
  movieId: string | number;
  bookingDate: string;
  bookingTime: string;
  seats: string;          // comma-separated, e.g. "A1,A2"
  ticketCount: number;
}

export const createCheckoutSession = async (
  payload: CheckoutSessionPayload,
) => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Failed to create checkout session");
  }

  return res.json() as Promise<{ url: string }>;
};

export const getCheckoutSession = async (sessionId: string) => {
  const res = await fetch(
    `/api/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`,
  );

  if (!res.ok) {
    throw new Error("Failed to retrieve checkout session");
  }

  return res.json() as Promise<{
    status: string;
    metadata: Record<string, string>;
  }>;
};

