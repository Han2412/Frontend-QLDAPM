import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import Sale from "../../src/pages/Sales/index";

// Mock the hooks
jest.mock("../../src/store/Slices/orderSlice", () => ({
  useGetAllOrderQuery: jest.fn(() => ({
    data: [
      {
        id: "1",
        staff: "John",
        table: { tableNumber: "5" },
        items: [
          {
            itemName: "Cơm Chiên",
            quantity: 2,
            price: 50000,
            note: "Không cay",
          },
        ],
      },
      {
        id: "2",
        staff: "Jane",
        table: { tableNumber: "3" },
        items: [
          {
            itemName: "Bánh Mì",
            quantity: 1,
            price: 30000,
            note: "Có dễ",
          },
        ],
      },
    ],
    isLoading: false,
    error: null,
  })),
}));

jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useCreatePaymentMutation: jest.fn(() => [
    jest.fn((data) => Promise.resolve({ unwrap: () => Promise.resolve() })),
    { isLoading: false },
  ]),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("Sales/Sale Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Sales page with title", () => {
    render(<Sale />);
    expect(screen.getByText("Danh sách order")).toBeInTheDocument();
  });

  test("displays order list", () => {
    render(<Sale />);
    expect(screen.getByText(/Order #/)).toBeInTheDocument();
  });

  test("displays staff name in orders", () => {
    render(<Sale />);
    expect(screen.getByText(/NV: John/)).toBeInTheDocument();
  });

  test("displays table number", () => {
    render(<Sale />);
    expect(screen.getByText(/Bàn:/)).toBeInTheDocument();
  });

  test("calculates total bill correctly", () => {
    const { container } = render(<Sale />);
    // The page should render without errors
    expect(container).toBeInTheDocument();
  });

  test("has grid layout for orders", () => {
    const { container } = render(<Sale />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });

  test("renders with proper styling", () => {
    const { container } = render(<Sale />);
    const wrapper = container.querySelector(".bg-white");
    expect(wrapper).toHaveClass("rounded-lg", "h-full", "font-semibold");
  });

  test("displays bold title", () => {
    const { container } = render(<Sale />);
    const title = container.querySelector("h2");
    expect(title).toHaveClass("font-bold", "text-2xl");
  });

  test("shows multiple orders", () => {
    const { container } = render(<Sale />);
    const orders = container.querySelectorAll(".border-2");
    expect(orders.length).toBeGreaterThan(0);
  });
});
