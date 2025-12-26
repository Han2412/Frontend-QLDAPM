import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "../../src/components/LoadingSpiner";

describe("LoadingSpinner Component", () => {
  test("renders loading spinner", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toBeInTheDocument();
  });

  test("has correct structure with animate-spin class", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  test("has correct dimensions", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toHaveClass("h-12", "w-12");
  });

  test("has border styling", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toHaveClass("border-t-2", "border-b-2", "border-gray-500");
  });

  test("has flexbox container styling", () => {
    const { container } = render(<LoadingSpinner />);
    const wrapper = container.querySelector(".flex");
    expect(wrapper).toHaveClass("w-full", "h-full", "justify-center", "items-center");
  });

  test("has rounded-full class for circular shape", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toHaveClass("rounded-full");
  });
});
