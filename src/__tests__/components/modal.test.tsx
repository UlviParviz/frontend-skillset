import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../shared/components";
import { ModalProps } from "../../shared/components/modal/types";

describe("Modal component", () => {
  const onCloseMock = jest.fn();
  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: onCloseMock,
    title: "Test Modal",
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it("renders modal with title and content when open", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close modal/i })
    ).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it("calls onClose when close button is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when modal content is clicked", () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText("Modal content"));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
