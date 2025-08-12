/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from "@testing-library/react";
import { Stack } from "../../shared/components";

describe("Stack component", () => {
  it("renders children correctly", () => {
    render(
      <Stack>
        <div data-testid="child">Stack</div>
      </Stack>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Stack");
  });

  it("applies default classes", () => {
    const { container } = render(<Stack children={undefined} />);
    const div = container.firstChild;
    expect(div).toHaveClass("stack");
    expect(div).toHaveClass("stack--display-block");
    expect(div).toHaveClass("stack--direction-row");
    expect(div).toHaveClass("stack--align-start");
    expect(div).toHaveClass("stack--justify-start");
    expect(div).not.toHaveClass("stack--wrap");
  });

  it("applies custom classes and styles", () => {
    const { container } = render(
      <Stack
        direction="column"
        align="center"
        justify="end"
        gap={10}
        wrap={true}
        display="flex"
        className="custom-class"
        style={{ backgroundColor: "red" }}
        width={100}
        height="50%"
      >
        Test Content
      </Stack>
    );

    const div = container.firstChild;

    expect(div).toHaveClass("stack");
    expect(div).toHaveClass("stack--direction-column");
    expect(div).toHaveClass("stack--align-center");
    expect(div).toHaveClass("stack--justify-end");
    expect(div).toHaveClass("stack--wrap");
    expect(div).toHaveClass("stack--display-flex");
    expect(div).toHaveClass("custom-class");

    // @ts-ignore
    expect(div.style.gap).toBe("10px");
    // @ts-ignore
    expect(div.style.width).toBe("100px");
    // @ts-ignore
    expect(div.style.height).toBe("50%");
    // @ts-ignore
    expect(div.style.backgroundColor).toBe("red");
  });
});
