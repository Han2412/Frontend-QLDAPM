import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../../src/pages/NotFound/NotFound";

describe("NotFound Component", () => {
  test("renders NotFound page", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  test("displays correct error message", () => {
    render(<NotFound />);
    expect(screen.getByText("404 — Không tìm thấy trang")).toBeInTheDocument();
  });

  test("has correct styling classes", () => {
    const { container } = render(<NotFound />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("min-h-screen", "flex", "items-center", "justify-center");
  });

  test("heading has correct text size", () => {
    const { container } = render(<NotFound />);
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-3xl");
  });
});
