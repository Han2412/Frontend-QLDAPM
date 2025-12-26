import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sale from "../../src/pages/Sales";
import { toast } from "react-toastify";

/* ================= MOCK ORDER QUERY ================= */
jest.mock("../../src/store/Slices/orderSlice", () => ({
  useGetAllOrderQuery: () => ({
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
  }),
}));

/* ================= MOCK PAYMENT ================= */
const mockCreatePayment = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useCreatePaymentMutation: () => [
    mockCreatePayment,
    { isLoading: false },
  ],
}));

/* ================= MOCK TOAST ================= */
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

/* ================= TEST SUITE ================= */
describe("Sales/Sale Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders page title", () => {
    render(<Sale />);
    expect(screen.getByText("Danh sách order")).toBeInTheDocument();
  });

  test("displays order list", () => {
    render(<Sale />);
    expect(screen.getAllByText(/Order #/).length).toBeGreaterThan(0);
  });

  test("displays staff name in orders", () => {
    render(<Sale />);
    expect(screen.getByText("NV: John")).toBeInTheDocument();
    expect(screen.getByText("NV: Jane")).toBeInTheDocument();
  });

  test("displays table number", () => {
    render(<Sale />);
    expect(screen.getAllByText(/Bàn:/).length).toBeGreaterThan(0);
  });

  test("calculates total bill correctly", () => {
    render(<Sale />);
    expect(screen.getByText(/100,000/)).toBeInTheDocument();
    expect(screen.getByText(/30,000/)).toBeInTheDocument();
  });

  test("renders multiple orders", () => {
    render(<Sale />);
    const orders = screen.getAllByText(/Order #/);
    expect(orders.length).toBe(2);
  });
});
