"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Movie } from "../types/type";

interface Props {
  movie: Movie;
}
export default function MovieCard({ movie }: Props) {
  return (
    <Card
      sx={{
        backgroundColor: "#1f1118",
        color: "white",
        borderRadius: "3",
        boxShadow: "0 10px 20px rgb(0,0,0,4)",
        maxWidth: 300,
        mx: "auto",
      }}
    >
      <CardMedia
        component="img"
        image={movie.image}
        sx={{
          height: 450,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">
          {movie.genre} | {movie.duration}
        </Typography>
        <Button>Book Now</Button>
      </CardContent>
    </Card>
  );
}
