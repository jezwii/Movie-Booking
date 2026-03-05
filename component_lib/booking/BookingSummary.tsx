import { Box, Typography } from "@mui/material";

interface Props {
  selectedSeats: string[];
  totalAmount: number;
}

export default function BookingSummary({ selectedSeats, totalAmount }: Props) {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Selected Seats: {selectedSeats.join(", ")}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#1976d2", mt: 1 }}
      >
        Total: ₹{totalAmount}
      </Typography>
    </Box>
  );
}
