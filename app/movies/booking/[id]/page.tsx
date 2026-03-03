"use client";
import { useMovieDetails } from "@/app/hooks/useMovies";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { toggleSeat } from "@/app/store/slices/movieSlice";

export default function bookingDetails() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { currMovie, loading, error } = useMovieDetails(id);
  const bookingDate = useSelector(
    (state: RootState) => state.movies.bookingDate,
  );
  const bookingTime = useSelector(
    (state: RootState) => state.movies.bookingTime,
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.movies.selectedSeats,
  );
  const dispatch = useDispatch();

  const rows = ["A", "B", "C", "D", "E"];
  const cols = Array.from({ length: 8 }, (_, i) => i + 1);

  const toggle = (seat: string) => {
    dispatch(toggleSeat(seat));
  };

  const canContinue = selectedSeats.length > 0;

  return (
    <>
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Card sx={{ display: "flex", maxWidth: 1100, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5" gutterBottom>
                Select seats
              </Typography>
              <Typography variant="h6" gutterBottom>
                Booking date: {bookingDate}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Booking Time: {bookingTime}
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
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
                            onClick={() => toggle(seat)}
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

                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!canContinue}
                      sx={{ mt: 4 }}
                      onClick={() => router.push(`/movies/payment/${id}`)}
                    >
                      Continue to payment
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </>
  );
}

{
  /* <Typography variant="h6" gutterBottom>
        Booking date: {bookingDate}
      </Typography>
      <Typography>Booking Time:{bookingTime}</Typography>

      <Typography variant="h6" gutterBottom>
        Select seats
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
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
                    onClick={() => toggle(seat)}
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

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!canContinue}
              onClick={() => router.push(`/payment/${id}`)}
            >
              Continue to payment
            </Button>
          </Box>
        </Box>
      </Box> */
}
