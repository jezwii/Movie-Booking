import React from "react";
import { render, screen } from "@testing-library/react";
import TicketCard from "./TicketCard";
import { Booking } from "../../app/types/type";

const mockBooking: Booking = {
  id: "session-abc123xyz",
  movieTitle: "Inception",
  movieImage: "https://example.com/inception.jpg",
  bookingDate: "2025-06-01",
  bookingTime: "7:00 PM",
  seats: ["A1", "A2", "B3"],
  totalAmount: 750,
  bookedAt: "2025-06-01T13:00:00.000Z",
};

const bookingWithoutImage: Booking = {
  ...mockBooking,
  id: "no-image-abc123",
  movieImage: "",
};

describe("TicketCard", () => {
  it("renders the movie title", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the booking id (last 8 chars, uppercased)", () => {
    render(<TicketCard booking={mockBooking} />);
    // id is "session-abc123xyz" → last 8 chars → "c123xyz" - wait, 8 chars: "3abc123xyz" slice(-8) = "c123xyz" (7)? Let's compute: "session-abc123xyz".slice(-8) = "c123xyz" → no: length=17, slice(-8)="c123xyz" (8 chars)
    const expectedCode = mockBooking.id.slice(-8).toUpperCase();
    expect(screen.getByText(`BOOKING #${expectedCode}`)).toBeInTheDocument();
  });

  it("renders the movie image when a URL is provided", () => {
    render(<TicketCard booking={mockBooking} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockBooking.movieImage);
    expect(img).toHaveAttribute("alt", mockBooking.movieTitle);
  });

  it("renders a fallback 'No Image' placeholder when movieImage is empty", () => {
    render(<TicketCard booking={bookingWithoutImage} />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("renders the booking date", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("2025-06-01")).toBeInTheDocument();
  });

  it("renders the booking time", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("7:00 PM")).toBeInTheDocument();
  });

  it("renders a comma-joined list of seats", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("A1, A2, B3")).toBeInTheDocument();
  });

  it("renders a chip for each seat", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("A2")).toBeInTheDocument();
    expect(screen.getByText("B3")).toBeInTheDocument();
  });

  it("renders the total amount", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("₹750")).toBeInTheDocument();
  });

  it("renders the cinema name", () => {
    render(<TicketCard booking={mockBooking} />);
    expect(screen.getByText("Starlight IMAX Grand")).toBeInTheDocument();
  });
});
