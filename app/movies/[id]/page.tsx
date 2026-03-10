"use client";
import { useMovieDetails } from "@/core_componets/hooks/useMovies";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PickDate from "@/component_lib/booking/PickDate";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function MovieDetailPage() {
  const bookingFeature = true;
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const bookingDate = useSelector(
    (state: RootState) => state.movies.bookingDate,
  );
  const bookingTime = useSelector(
    (state: RootState) => state.movies.bookingTime,
  );

  const canContinue = bookingDate && bookingTime && bookingFeature;

  const { currMovie, loading, error } = useMovieDetails(id);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load movie: {error}</Alert>
      </Box>
    );
  }

  if (!currMovie) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, maxWidth: 1100, width: "100%" }}>
        <CardMedia
          component="img"
          image={currMovie.image}
          alt={currMovie.title}
          sx={{ width: { xs: "100%", md: 400 }, height: { xs: 350, sm: 450, md: "auto" }, objectFit: "cover" }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="h1" variant="h4" gutterBottom>
              {currMovie.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {currMovie.duration} • ⭐{currMovie.rating}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {currMovie.description}
            </Typography>
          </CardContent>

          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "stretch", sm: "flex-end" },
            }}
          >
            {/* date selection stored in redux */}
            <Box sx={{ mr: 2, mb: 2 }}>{bookingFeature && <PickDate />}</Box>
            <Button
              onClick={() => {
                router.push(`booking/${currMovie.id}`);
              }}
              variant="contained"
              disabled={!canContinue}
              color="primary"
              sx={{ mr: 2, mb: 2 }}
            >
              {bookingFeature ? "Book Now" : "Booking Feature not available"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
