"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Box, Typography, Divider } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TicketCard from "@/component_lib/booking/TicketCard";

export default function BookingDetailsPage() {
  const bookings = useSelector((state: RootState) => state.bookings.bookings);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          My Bookings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bookings.length} {bookings.length === 1 ? "ticket" : "tickets"} found
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {bookings.length === 0 ? (
        // Empty state
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 10,
            gap: 2,
            color: "text.disabled",
          }}
        >
          <ConfirmationNumberIcon sx={{ fontSize: 80, opacity: 0.3 }} />
          <Typography variant="h6" color="text.disabled">
            No bookings yet
          </Typography>
          <Typography variant="body2" color="text.disabled" textAlign="center">
            After you complete a payment, your tickets will appear here.
          </Typography>
        </Box>
      ) : (
        // Ticket list
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {bookings.map((booking) => (
            <TicketCard key={booking.id} booking={booking} />
          ))}
        </Box>
      )}
    </Box>
  );
}
