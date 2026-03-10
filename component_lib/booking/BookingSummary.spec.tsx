import React from "react";
import { render, screen } from "@testing-library/react";
import BookingSummary from "./BookingSummary";

describe("BookingSummary", () => {
  it("renders the empty-state message when no seats are selected", () => {
    render(<BookingSummary selectedSeats={[]} totalAmount={0} />);
    expect(
      screen.getByText("Select seats to see your summary")
    ).toBeInTheDocument();
  });

  it("renders the order summary when seats are selected", () => {
    render(<BookingSummary selectedSeats={["A1", "B2"]} totalAmount={500} />);
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });

  it("renders a chip for each selected seat", () => {
    render(<BookingSummary selectedSeats={["A1", "B2", "C3"]} totalAmount={750} />);
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("B2")).toBeInTheDocument();
    expect(screen.getByText("C3")).toBeInTheDocument();
  });

  it("displays the totalAmount in the summary", () => {
    render(<BookingSummary selectedSeats={["A1"]} totalAmount={250} />);
    // totalAmount appears twice (price row + total row)
    const amountTexts = screen.getAllByText(/₹250/);
    expect(amountTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("displays the correct seat count and unit price", () => {
    render(<BookingSummary selectedSeats={["A1", "A2"]} totalAmount={500} />);
    // "2 × ₹250"
    expect(screen.getByText(/2 × ₹250/)).toBeInTheDocument();
  });

  it("shows Total label above the highlighted total", () => {
    render(<BookingSummary selectedSeats={["A1"]} totalAmount={250} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
  });
});
