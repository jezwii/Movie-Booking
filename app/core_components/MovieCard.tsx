"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Movie } from "../types/type";

interface Props {
  movie: Movie;
}
export default function MovieCard({ movie }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`movies/${movie.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: "#1f1118",
        color: "white",
        borderRadius: "3",
        boxShadow: "0 10px 20px rgb(0,0,0,4)",
        maxWidth: 300,
        mx: "auto",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
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
        <Typography variant="body2">⭐{movie.rating}</Typography>
        <Typography variant="body2">{movie.duration}</Typography>
      </CardContent>
      <Button
        onClick={() => {
          router.push("/bookingPage");
        }}
      >
        Book Now
      </Button>
    </Card>
  );
}
