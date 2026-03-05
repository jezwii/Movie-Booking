"use client";

import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Booking } from "@/app/types/type";

interface TicketCardProps {
  booking: Booking;
}

export default function TicketCard({ booking }: TicketCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        position: "relative",
        bgcolor: "background.paper",
        "&::before": {
          content: '""',
          position: "absolute",
          left: { xs: "50%", sm: 220 },
          top: { xs: "auto", sm: 0 },
          bottom: { xs: 0, sm: "auto" },
          transform: {
            xs: "translate(-50%, 50%)",
            sm: "translate(-50%, 0)",
          },
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: "background.default",
          zIndex: 2,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: { xs: "50%", sm: 220 },
          bottom: { xs: "auto", sm: 0 },
          top: { xs: 0, sm: "auto" },
          transform: {
            xs: "translate(-50%, -50%)",
            sm: "translate(-50%, 0)",
          },
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: "background.default",
          zIndex: 2,
        },
      }}
    >
      {/* Movie Poster */}
      {booking.movieImage ? (
        <CardMedia
          component="img"
          image={booking.movieImage}
          alt={booking.movieTitle}
          sx={{
            width: { xs: "100%", sm: 220 },
            height: { xs: 180, sm: "auto" },
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <Box
          sx={{
            width: { xs: "100%", sm: 220 },
            height: { xs: 180, sm: "auto" },
            bgcolor: "grey.800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Typography color="grey.500">No Image</Typography>
        </Box>
      )}

      {/* Dashed separator */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: "none", sm: "block" },
          borderStyle: "dashed",
          borderColor: "divider",
          mx: 0,
        }}
      />

      {/* Ticket Details */}
      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="secondary" fontWeight={600} letterSpacing={1}>
            BOOKING #{booking.id.slice(-8).toUpperCase()}
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
            {booking.movieTitle}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <EventIcon fontSize="small" color="action" />
            <Typography variant="body2">{booking.bookingDate}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2">{booking.bookingTime}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <EventSeatIcon fontSize="small" color="action" />
            <Typography variant="body2">{booking.seats.join(", ")}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {booking.seats.map((seat) => (
            <Chip
              key={seat}
              label={seat}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              CINEMA
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              Starlight IMAX Grand
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" color="text.secondary">
              TOTAL PAID
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ₹{booking.totalAmount}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="text.disabled">
          Booked on {new Date(booking.bookedAt).toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Card>
  );
}
