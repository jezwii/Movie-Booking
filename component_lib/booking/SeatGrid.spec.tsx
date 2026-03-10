import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SeatGrid from "./SeatGrid";

describe("SeatGrid", () => {
  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const totalSeats = rows.length * cols.length; // 40

  it("renders all 40 seat buttons", () => {
    const onToggle = jest.fn();
    render(<SeatGrid selectedSeats={[]} onToggle={onToggle} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(totalSeats);
  });

  it("renders each seat label (e.g. A1, E8)", () => {
    render(<SeatGrid selectedSeats={[]} onToggle={jest.fn()} />);
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("E8")).toBeInTheDocument();
  });

  it("renders seats as 'contained' variant when selected", () => {
    render(<SeatGrid selectedSeats={["B3"]} onToggle={jest.fn()} />);
    // MUI renders contained buttons with a different class; the button still exists
    const b3Button = screen.getByText("B3").closest("button");
    expect(b3Button).toBeInTheDocument();
  });

  it("calls onToggle with the correct seat label when a seat button is clicked", () => {
    const onToggle = jest.fn();
    render(<SeatGrid selectedSeats={[]} onToggle={onToggle} />);
    fireEvent.click(screen.getByText("C5"));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith("C5");
  });

  it("calls onToggle when a selected seat is clicked (to deselect)", () => {
    const onToggle = jest.fn();
    render(<SeatGrid selectedSeats={["A1"]} onToggle={onToggle} />);
    fireEvent.click(screen.getByText("A1"));
    expect(onToggle).toHaveBeenCalledWith("A1");
  });
});
