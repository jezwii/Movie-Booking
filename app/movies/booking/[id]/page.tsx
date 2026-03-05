"use client";
import { useParams } from "next/navigation";
import BookingDetails from "../../../../component_lib/booking/BookingDetails";

export default function BookingPage() {
  const params = useParams();
  const id = params.id as string;

  return <BookingDetails movieId={id} />;
}
