import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Orderpage from "../../src/pages/OrderPage/index";

// Mock socket
jest.mock("../../src/socket/socketconfig", () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock components
jest.mock("../../src/components/Layouts/Header", () => {
  return function DummyHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock("../../src/pages/OrderPage/ListTable", () => {
  return function DummyListTable() {
    return <div data-testid="list-table">List Table</div>;
  };
});

describe("Orderpage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Orderpage", () => {
    const { container } = render(<Orderpage />);
    expect(container).toBeInTheDocument();
  });

  test("renders Header component", () => {
    render(<Orderpage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders ListTable component", () => {
    render(<Orderpage />);
    expect(screen.getByTestId("list-table")).toBeInTheDocument();
  });

  test("sets up socket listener on mount", () => {
    const { socket } = require("../../src/socket/socketconfig");
    render(<Orderpage />);
    expect(socket.on).toHaveBeenCalledWith("orderDone", expect.any(Function));
  });

  test("cleans up socket listener on unmount", () => {
    const { socket } = require("../../src/socket/socketconfig");
    const { unmount } = render(<Orderpage />);
    unmount();
    expect(socket.off).toHaveBeenCalledWith("orderDone", expect.any(Function));
  });

  test("renders without errors", () => {
    const { container } = render(<Orderpage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("has div wrapper", () => {
    const { container } = render(<Orderpage />);
    expect(container.firstChild.tagName).toBe("DIV");
  });
});
