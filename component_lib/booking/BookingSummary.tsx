import { Box, Typography, Chip, Divider } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const TICKET_PRICE = 250;

interface Props {
  selectedSeats: string[];
  totalAmount: number;
}

export default function BookingSummary({ selectedSeats, totalAmount }: Props) {
  if (selectedSeats.length === 0) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 2.5,
          borderRadius: 2,
          border: "1px dashed #444",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Select seats to see your summary
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 3,
        p: 2.5,
        borderRadius: 2,
        border: "1px solid #2e2e2e",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: "text.secondary", letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
        Order Summary
      </Typography>

      {/* Seat chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2 }}>
        {selectedSeats.map((seat) => (
          <Chip
            key={seat}
            label={seat}
            size="small"
            icon={<ConfirmationNumberIcon sx={{ fontSize: 14 }} />}
            sx={{
              bgcolor: "rgba(233,30,99,0.12)",
              color: "#E91E63",
              border: "1px solid rgba(233,30,99,0.3)",
              fontWeight: 600,
              fontSize: 12,
              "& .MuiChip-icon": { color: "#E91E63" },
            }}
          />
        ))}
      </Box>

      {/* Price row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {selectedSeats.length} × ₹{TICKET_PRICE}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{totalAmount}
        </Typography>
      </Box>

      <Divider sx={{ my: 1.5, borderColor: "#2e2e2e" }} />

      {/* Total */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Total
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#E91E63" }}
        >
          ₹{totalAmount}
        </Typography>
      </Box>
    </Box>
  );
}
