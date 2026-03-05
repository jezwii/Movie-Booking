"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { RootState } from "@/app/store/store";
import {
  createCheckoutSession,
} from "@/app/services/paymentService";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get booking details from Redux
  const selectedMovie = useSelector(
    (state: RootState) => state.movies.selectedMovie,
  );
  const bookingDate = useSelector(
    (state: RootState) => state.movies.bookingDate,
  );
  const bookingTime = useSelector(
    (state: RootState) => state.movies.bookingTime,
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.movies.selectedSeats,
  );
  const totalAmount = useSelector(
    (state: RootState) => state.payment.totalAmount,
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!totalAmount || totalAmount <= 0) {
        setError("Invalid booking amount.");
        return;
      }

      const data = await createCheckoutSession({
        totalAmount: totalAmount ?? 0,
        movieTitle: selectedMovie?.title ?? "",
        movieImage: selectedMovie?.image ?? "",
        movieId: selectedMovie?.id ?? "",
        bookingDate: bookingDate ?? "",
        bookingTime: bookingTime ?? "",
        seats: selectedSeats.join(","),
        ticketCount: selectedSeats.length,
      });

      // Redirect to Stripe's hosted checkout page
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex", maxWidth: 600, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Container maxWidth="sm" sx={{ py: 4 }}>
              {/* Booking Summary */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    Booking Summary
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Movie
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedMovie?.title || "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Date &amp; Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {bookingDate || "N/A"} {bookingTime || ""}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Seats
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ pt: 2, borderTop: "1px solid #eee" }}>
                    <Typography variant="body2" color="textSecondary">
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      ₹{totalAmount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LockIcon />
                  )
                }
                onClick={handleCheckout}
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? "Redirecting to Stripe…" : "Continue to Payment"}
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textAlign: "center", mt: 1.5 }}
              >
                You will be redirected to Stripe's secure payment page.
              </Typography>
            </Container>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
