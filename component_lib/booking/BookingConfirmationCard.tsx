"use client";

import {
  Box,
  Card,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { BookingMeta } from "@/app/hooks/usePaymentSuccess";

interface BookingConfirmationCardProps {
  meta: BookingMeta;
  sessionId: string;
}

export default function BookingConfirmationCard({
  meta,
  sessionId,
}: BookingConfirmationCardProps) {
  const selectedSeats = meta.seats ? meta.seats.split(",") : [];
  const totalAmount = Number(meta.totalAmount);
  const ticketCount = selectedSeats.length;
  const bookingNumber = `${meta.movieId}${meta.seats}`;

  return (
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
      {meta.movieImage && (
        <CardMedia
          component="img"
          image={meta.movieImage}
          alt={meta.movieTitle}
          sx={{ width: { xs: "100%", md: 250 }, height: "auto" }}
        />
      )}
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography variant="caption" color="secondary">
          BOOKING #{bookingNumber}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
          {meta.movieTitle}
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
              {meta.bookingDate} {meta.bookingTime}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="subtitle2" color="textSecondary">
              SEATS
            </Typography>
            <Typography variant="body2">{selectedSeats.join(", ")}</Typography>
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
  );
}
