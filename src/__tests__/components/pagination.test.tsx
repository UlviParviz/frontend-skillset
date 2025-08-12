import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../shared/components";

describe("Pagination component", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it("renders correct page numbers when totalPages <= 7", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("renders correct pagination with dots when totalPages > 7 and currentPage near start", () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders correct pagination with dots when currentPage near end", () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText("...").length).toBe(1);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders correct pagination with dots when currentPage in middle", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    const dots = screen.getAllByText("...");
    expect(dots.length).toBe(2);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onPageChange with previous page when previous button clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: /previous/i }) || screen.getAllByRole("button")[0]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: /previous/i }) || screen.getAllByRole("button")[0]).toBeDisabled();
  });

it("calls onPageChange with next page when next button clicked", () => {
  render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
  fireEvent.click(screen.getByRole("button", { name: /next page/i }));
  expect(onPageChange).toHaveBeenCalledWith(4);
});

it("disables next button on last page", () => {
  render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
  expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
});
  it("calls onPageChange with correct page number when page button clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("4"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("adds 'active' class to current page button", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    const currentPageBtn = screen.getByText("3");
    expect(currentPageBtn).toHaveClass("active");
  });
});
