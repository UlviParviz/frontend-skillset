import { render, screen } from "@testing-library/react";
import { Text } from "../../shared/components";

describe("Text component", () => {
  it("renders children correctly", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Text>Hello</Text>);
    const element = screen.getByText("Hello");
    expect(element).toHaveClass("text");
    expect(element).toHaveClass("weight-normal");
    expect(element).toHaveClass("size-medium");
    expect(element).toHaveClass("color-default");
  });

  it("applies custom weight, size and color", () => {
    render(
      <Text weight="bold" size="large" color="primary">
        Custom Style
      </Text>
    );
    const element = screen.getByText("Custom Style");
    expect(element).toHaveClass("weight-bold");
    expect(element).toHaveClass("size-large");
    expect(element).toHaveClass("color-primary");
  });

  it("includes additional className", () => {
    render(
      <Text className="custom-class">With Custom Class</Text>
    );
    const element = screen.getByText("With Custom Class");
    expect(element).toHaveClass("custom-class");
  });
});
