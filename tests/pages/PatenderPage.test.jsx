import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatenderPage from "../../src/pages/PatenderPage/index";

// Mock components
jest.mock("../../src/components/Layouts/Header", () => {
  return function DummyHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock("../../src/pages/PatenderPage/listOrder", () => {
  return function DummyListOrder() {
    return <div data-testid="list-order">List Order</div>;
  };
});

describe("PatenderPage Component", () => {
  test("renders PatenderPage", () => {
    const { container } = render(<PatenderPage />);
    expect(container).toBeInTheDocument();
  });

  test("renders Header component", () => {
    render(<PatenderPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders ListOrder component", () => {
    render(<PatenderPage />);
    expect(screen.getByTestId("list-order")).toBeInTheDocument();
  });

  test("has correct layout styling", () => {
    const { container } = render(<PatenderPage />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("h-[100vh]", "bg-gray-200");
  });

  test("is fullscreen height", () => {
    const { container } = render(<PatenderPage />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("h-[100vh]");
  });

  test("has gray background", () => {
    const { container } = render(<PatenderPage />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-gray-200");
  });

  test("renders without errors", () => {
    const { container } = render(<PatenderPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("children are rendered in correct order", () => {
    const { container } = render(<PatenderPage />);
    const children = container.firstChild.children;
    expect(children[0]).toHaveAttribute("data-testid", "header");
    expect(children[1]).toHaveAttribute("data-testid", "list-order");
  });
});
