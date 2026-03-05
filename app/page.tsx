"use client";
import { Grid, Typography, Box, CircularProgress, Alert } from "@mui/material";
import MovieCard from "../component_lib/shared_components/MovieCard";
import { useMovies } from "./hooks/useMovies";
import WithAuth from "@/app/providers/withAuth";

export default function Home() {
  const { movies, loading, error } = useMovies();

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
        <Alert severity="error">Failed to load movies: {error}</Alert>
      </Box>
    );
  }

  return (
    <WithAuth>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "white" }}>
          Featured Movies
        </Typography>
        <Grid container spacing={5}>
          {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </WithAuth>
  );
}
