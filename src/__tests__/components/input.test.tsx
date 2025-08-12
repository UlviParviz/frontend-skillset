import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../shared/components";

describe("Input Component", () => {
  test("renders with default props", () => {
    render(<Input value="" onChange={() => {}} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders with custom placeholder", () => {
    render(<Input value="" onChange={() => {}} placeholder="Enter name" />);
    const inputElement = screen.getByPlaceholderText("Enter name");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn(() => {});
    render(<Input value="" onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renders with custom type", () => {
    render(<Input type="password" value="" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText("") as HTMLInputElement;
    expect(inputElement.type).toBe("password");
  });

  test("applies custom className", () => {
    render(<Input value="" onChange={() => {}} className="my-input" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-input");
    expect(inputElement).toHaveClass("my-input");
  });
});
