import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sale from "../../src/pages/Sales";

/* ================= MOCK order query ================= */
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

/* ================= MOCK payment ================= */
jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useCreatePaymentMutation: () => [jest.fn(), { isLoading: false }],
}));

/* ================= MOCK toast ================= */
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("Sales Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation((msg) => {
      if (typeof msg === "string" && msg.includes("Each child in a list")) {
        return;
      }
    });
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("renders page title", () => {
    render(<Sale />);
    expect(screen.getByText("Danh sách order")).toBeInTheDocument();
  });

  test("renders orders list", () => {
    render(<Sale />);
    expect(screen.getAllByText(/Order/).length).toBe(2);
  });

  test("renders staff & table info", () => {
    render(<Sale />);
    expect(screen.getByText("NV: John")).toBeInTheDocument();
    expect(screen.getByText("Bàn: 5")).toBeInTheDocument();
    expect(screen.getByText("NV: Jane")).toBeInTheDocument();
    expect(screen.getByText("Bàn: 3")).toBeInTheDocument();
  });

  test("shows empty state initially", () => {
    render(<Sale />);
    expect(
      screen.getByText("Không có dữ liệu đơn hàng.")
    ).toBeInTheDocument();
  });

  test("shows order details after clicking xem", () => {
    render(<Sale />);

    const viewButtons = screen.getAllByText("xem");
    fireEvent.click(viewButtons[0]);

    // lấy phần chi tiết order
    const orderDetail = screen.getByText("Chi tiết Order").closest("div");
    const withinOrder = within(orderDetail);

    expect(withinOrder.getByText("Cơm Chiên")).toBeInTheDocument();
    expect(withinOrder.getByText("Không cay")).toBeInTheDocument();
    expect(withinOrder.getByText("2")).toBeInTheDocument(); // số lượng trong chi tiết
    expect(withinOrder.getByText(/50,000/)).toBeInTheDocument(); // giá trong chi tiết
  });
});
