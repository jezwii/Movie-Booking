"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useRouter } from "next/navigation";
import { usePaymentSuccess } from "@/app/hooks/usePaymentSuccess";
import BookingConfirmationCard from "@/component_lib/booking/BookingConfirmationCard";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { meta, fetchError } = usePaymentSuccess(sessionId);

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

      <BookingConfirmationCard meta={meta!} sessionId={sessionId!} />

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
          startIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<CircularProgress sx={{ m: "auto", mt: 8 }} />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
