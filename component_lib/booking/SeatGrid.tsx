import { Box, Button, Typography } from "@mui/material";

interface Props {
  selectedSeats: string[];
  onToggle: (seat: string) => void;
}

export default function SeatGrid({ selectedSeats, onToggle }: Props) {
  const rows = ["A", "B", "C", "D", "E"];
  const cols = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 40px)",
        gap: 2,
        width: "fit-content",
      }}
    >
      {rows.map((r) =>
        cols.map((c) => {
          const seat = `${r}${c}`;
          const selected = selectedSeats.includes(seat);
          return (
            <Button
              key={seat}
              variant={selected ? "contained" : "outlined"}
              color={selected ? "primary" : "inherit"}
              onClick={() => onToggle(seat)}
              sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
            >
              <Typography variant="button" sx={{ fontSize: 12 }}>
                {seat}
              </Typography>
            </Button>
          );
        }),
      )}
    </Box>
  );
}
