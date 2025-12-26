import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages/Dashboard/Home";

describe("Home/Dashboard Component", () => {
  test("renders Home page", () => {
    render(<Home />);
    expect(screen.getByText("Trang chủ")).toBeInTheDocument();
  });

  test("renders heading with correct text size", () => {
    const { container } = render(<Home />);
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-2xl");
  });

  test("has correct styling classes", () => {
    const { container } = render(<Home />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("flex", "bg-white", "h-full", "w-full", "rounded-lg");
  });

  test("renders without errors", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  test("has proper padding", () => {
    const { container } = render(<Home />);
    const contentDiv = container.querySelector(".p-3");
    expect(contentDiv).toBeInTheDocument();
  });

  test("displays greeting message", () => {
    render(<Home />);
    expect(screen.getByText("Trang chủ")).toBeVisible();
  });
});
