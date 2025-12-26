import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import OrderCard from "../../src/pages/OrderPage/OrderCard";

// Mock the mutation hook
jest.mock("../../src/store/Slices/orderSlice", () => ({
  useUpdateOrderStatusMutation: () => [
    jest.fn((data) => Promise.resolve({ unwrap: () => Promise.resolve() })),
    { isLoading: false },
  ],
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("OrderCard Component", () => {
  const mockOrder = {
    id: "1",
    staff: "John Doe",
    table: { tableNumber: "5" },
    items: [
      {
        itemName: "Cơm Chiên",
        quantity: 2,
        note: "Không cay",
      },
      {
        itemName: "Nước Cam",
        quantity: 1,
        note: "Có đá",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders order card with staff and table info", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText(/NV:John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/bàn:5/)).toBeInTheDocument();
  });

  test("displays all order items", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("Cơm Chiên")).toBeInTheDocument();
    expect(screen.getByText("Nước Cam")).toBeInTheDocument();
  });

  test("displays item quantities", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText(/sl:2/)).toBeInTheDocument();
    expect(screen.getByText(/sl:1/)).toBeInTheDocument();
  });

  test("displays item notes", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("note: Không cay")).toBeInTheDocument();
    expect(screen.getByText("note: Có đá")).toBeInTheDocument();
  });

  test("renders complete button", () => {
    render(<OrderCard order={mockOrder} />);

    const button = screen.getByRole("button", { name: /xong/i });
    expect(button).toBeInTheDocument();
  });

  test("button has correct styling classes", () => {
    render(<OrderCard order={mockOrder} />);

    const button = screen.getByRole("button", { name: /xong/i });
    expect(button).toHaveClass("bg-[#0bb783]", "text-white", "font-bold");
  });

  test("card has correct border styling", () => {
    const { container } = render(<OrderCard order={mockOrder} />);
    const card = container.firstChild;

    expect(card).toHaveClass("border-4", "rounded-2xl", "border-[#0bb7838e]");
  });

  test("renders multiple items in list", () => {
    const { container } = render(<OrderCard order={mockOrder} />);
    const listItems = container.querySelectorAll("li");

    expect(listItems).toHaveLength(2);
  });
});
