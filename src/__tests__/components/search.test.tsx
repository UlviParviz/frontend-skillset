import { render, screen, fireEvent, act } from "@testing-library/react";
import { Search } from "../../shared/components";

jest.useFakeTimers();

describe("Search", () => {
  it("renders input with placeholder", () => {
    render(<Search onSearch={() => {}} placeholder="Search" />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls search with debounced input value", () => {
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "abcabc" } });

    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(onSearch).toHaveBeenCalledWith("abcabc");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
