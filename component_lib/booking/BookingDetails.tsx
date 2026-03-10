import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { toggleSeat } from "@/app/store/slices/movieSlice";
import { setTotalAmount } from "@/app/store/slices/paymentSlice";
import { createCheckoutSession } from "@/core_componets/services/paymentService";
import SeatGrid from "./SeatGrid";
import BookingSummary from "./BookingSummary";

const TICKET_PRICE = 250; // ₹250 per ticket

interface Props {
  movieId: string;
}

export default function BookingDetails({ movieId }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const toggle = (seat: string) => dispatch(toggleSeat(seat));

  const totalAmount = selectedSeats.length * TICKET_PRICE;
  const canPay = selectedSeats.length > 0 && !loading;

  const handlePay = async () => {
    try {
      setLoading(true);
      setError(null);
      dispatch(setTotalAmount(totalAmount));

      const data = await createCheckoutSession({
        totalAmount,
        movieTitle: selectedMovie?.title ?? "",
        movieImage: selectedMovie?.image ?? "",
        movieId: selectedMovie?.id ?? movieId,
        bookingDate: bookingDate ?? "",
        bookingTime: bookingTime ?? "",
        seats: selectedSeats.join(","),
        ticketCount: selectedSeats.length,
      });

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex", maxWidth: 1100, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            {/* ── Header ── */}
            <Box sx={{ mb: 3 }}>
              {/* Breadcrumb label */}
              <Typography
                variant="overline"
                sx={{
                  color: "#E91E63",
                  fontWeight: 700,
                  letterSpacing: 2,
                  fontSize: 11,
                }}
              >
                Now Booking
              </Typography>

              {/* Movie title */}
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, mt: 0.5, mb: 2, lineHeight: 1.2 }}
              >
                {selectedMovie?.title ?? "Select Seats"}
              </Typography>

              {/* Info chips row */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <CalendarTodayIcon sx={{ fontSize: 15, color: "#E91E63" }} />
                  <Typography variant="body2" color="text.secondary">
                    {bookingDate ?? "—"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <AccessTimeIcon sx={{ fontSize: 15, color: "#E91E63" }} />
                  <Typography variant="body2" color="text.secondary">
                    {bookingTime ?? "—"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <LocalActivityIcon sx={{ fontSize: 15, color: "#E91E63" }} />
                  <Typography variant="body2" color="text.secondary">
                    ₹{TICKET_PRICE} / seat
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3, borderColor: "#2a2a2a" }} />

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                overflowX: "auto",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 450 }}>
                <Box sx={{ overflowX: "auto", pb: 2, display: "flex", justifyContent: "center" }}>
                  <SeatGrid onToggle={toggle} selectedSeats={selectedSeats} />
                </Box>
                <BookingSummary
                  selectedSeats={selectedSeats}
                  totalAmount={totalAmount}
                />
              </Box>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!canPay}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <LockIcon />
                  )
                }
                sx={{ mt: 4 }}
                onClick={handlePay}
              >
                {loading ? "Redirecting to Stripe…" : `Pay ₹${totalAmount}`}
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 1.5 }}
            >
              You will be redirected to Stripe`apos;`s secure payment page.
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
