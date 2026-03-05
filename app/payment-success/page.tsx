"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addBooking } from "@/app/store/slices/bookingSlice";
import { getCheckoutSession } from "@/app/services/paymentService";

interface BookingMeta {
  movieTitle: string;
  movieImage: string;
  movieId: string;
  bookingDate: string;
  bookingTime: string;
  seats: string;
  totalAmount: string;
}

function PaymentSuccessContent() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";

  const [meta, setMeta] = useState<BookingMeta | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setFetchError("No session ID found in URL.");
      return;
    }

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
            }),
          );
        }
      })
      .catch(() => setFetchError("Failed to load booking details."));
  }, [sessionId]);

  // Loading state
  if (!meta && !fetchError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography color="text.secondary">Loading your booking…</Typography>
      </Box>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, px: 2 }}>
        <Alert severity="error">{fetchError}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => router.push("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const selectedSeats = meta!.seats ? meta!.seats.split(",") : [];
  const totalAmount = Number(meta!.totalAmount);
  const ticketCount = selectedSeats.length;
  const bookingNumber = `${meta!.movieId}${meta!.seats}`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 8,
        px: 2,
      }}
    >
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
        Your booking is confirmed.
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mt: 4,
          maxWidth: 900,
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {meta!.movieImage && (
          <CardMedia
            component="img"
            image={meta!.movieImage}
            alt={meta!.movieTitle}
            sx={{ width: { xs: "100%", md: 250 }, height: "auto" }}
          />
        )}
        <Box sx={{ p: 3, flex: 1 }}>
          <Typography variant="caption" color="secondary">
            BOOKING #{bookingNumber}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
            {meta!.movieTitle}
          </Typography>

          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="subtitle2" color="textSecondary">
                CINEMA
              </Typography>
              <Typography variant="body2">Starlight IMAX Grand</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="subtitle2" color="textSecondary">
                DATE &amp; TIME
              </Typography>
              <Typography variant="body2">
                {meta!.bookingDate} {meta!.bookingTime}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="subtitle2" color="textSecondary">
                SEATS
              </Typography>
              <Typography variant="body2">
                {selectedSeats.join(", ")}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL AMOUNT
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                ₹{totalAmount}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {ticketCount} Adult {ticketCount === 1 ? "Ticket" : "Tickets"}
          </Typography>
        </Box>
      </Card>

      <Button
        variant="contained"
        color="primary"
        startIcon={<ConfirmationNumberIcon />}
        sx={{ mt: 4, minWidth: 200 }}
        onClick={() => router.push("/booking-details")}
      >
        View My Bookings
      </Button>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={() => {
            // share logic placeholder
          }}
        >
          Share
        </Button>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}

// useSearchParams requires Suspense wrapper in Next.js App Router
export default function PaymentSuccess() {
  return (
    <Suspense fallback={<CircularProgress sx={{ m: "auto", mt: 8 }} />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
