import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { toggleSeat } from "@/app/store/slices/movieSlice";
import { setTotalAmount } from "@/app/store/slices/paymentSlice";
import SeatGrid from "./SeatGrid";
import BookingSummary from "./BookingSummary";

const TICKET_PRICE = 250; // ₹250 per ticket
interface Props {
  movieId: string;
}

export default function BookingDetails({ movieId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const bookingDate = useSelector(
    (state: RootState) => state.movies.bookingDate,
  );
  const bookingTime = useSelector(
    (state: RootState) => state.movies.bookingTime,
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.movies.selectedSeats,
  );

  const toggle = (seat: string) => {
    dispatch(toggleSeat(seat));
  };

  const canContinue = selectedSeats.length > 0;
  const totalAmount = selectedSeats.length * TICKET_PRICE;

  const handleContinueToPayment = () => {
    dispatch(setTotalAmount(totalAmount));
    router.push(`/movies/payment/${movieId}`);
  };
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
                  <SeatGrid onToggle={toggle} selectedSeats={selectedSeats} />
                  <BookingSummary
                    selectedSeats={selectedSeats}
                    totalAmount={totalAmount}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!canContinue}
                  sx={{ mt: 4 }}
                  onClick={handleContinueToPayment}
                >
                  Continue to payment (₹{totalAmount})
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </>
  );
}
