"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Typography, Box, CircularProgress, Alert } from "@mui/material";
import MovieCard from "@/component_lib/booking/MovieCard";
import { useSearchMovies } from "@/core_componets/hooks/useMovies";
import WithAuth from "@/app/providers/withAuth";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { movies, loading, error } = useSearchMovies(query);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load search results: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "white" }}>
        {query ? `Search Results for "${query}"` : "Search Movies"}
      </Typography>

      {query && movies.length === 0 && !loading && !error && (
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          No movies found for this search.
        </Typography>
      )}

      <Grid container spacing={5}>
        {movies.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function SearchPage() {
  return (
    <WithAuth>
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        }
      >
        <SearchResultsContent />
      </Suspense>
    </WithAuth>
  );
}
