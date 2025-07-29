import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("initial count should be 0", () => {
    render(<Counter />);
    const countValue = screen.getByTestId("count-value");
    expect(countValue).toHaveTextContent("Count: 0");
  });

  test("clicking increment increases the count", () => {
    render(<Counter />);
    const button = screen.getByText("Increment");
    fireEvent.click(button);
    const countValue = screen.getByTestId("count-value");
    expect(countValue).toHaveTextContent("Count: 1");
  });
});
