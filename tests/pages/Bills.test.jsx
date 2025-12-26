import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bills from "../../src/pages/Bills/index";

/* ================= MOCK DATA ================= */
const mockPayments = [
  {
    id: "1",
    invoiceNumber: "INV001", // UI không dùng → KHÔNG test
    totalAmount: 100000,
    createdAt: "2025-10-26",
    order: {
      createdByName: "John",
    },
  },
  {
    id: "2",
    invoiceNumber: "INV002",
    totalAmount: 150000,
    createdAt: "2025-10-27",
    order: {
      createdByName: "Jane",
    },
  },
];

/* ================= MOCK RTK QUERY ================= */
jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useGetPaymentsByDateRangeQuery: jest.fn(() => ({
    data: mockPayments,
    isLoading: false,
    error: null,
  })),
}));

describe("Bills Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ---------- BASIC RENDER ---------- */
  test("renders Bills page title", () => {
    render(<Bills />);
    expect(
      screen.getByText("Danh sách hóa đơn")
    ).toBeInTheDocument();
  });

  /* ---------- FILTER INPUTS ---------- */
  test("renders date filter inputs", () => {
    render(<Bills />);

    expect(screen.getByLabelText("Từ ngày:")).toBeInTheDocument();
    expect(screen.getByLabelText("Đến ngày:")).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<Bills />);
    expect(
      screen.getByPlaceholderText("Tìm kiếm")
    ).toBeInTheDocument();
  });

  /* ---------- TABLE DATA ---------- */
  test("renders bills rows correctly", () => {
    render(<Bills />);

    // STT (index + 1)
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Nhân viên
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();

    // Tổng tiền (text bị tách + VNĐ → regex)
    expect(screen.getByText(/100\.000/)).toBeInTheDocument();
    expect(screen.getByText(/150\.000/)).toBeInTheDocument();

    // Nút Xem
    expect(
      screen.getAllByRole("button", { name: /xem/i }).length
    ).toBe(2);
  });

  /* ---------- INPUT BEHAVIOR ---------- */
  test("updates fromDate when input changes", () => {
    render(<Bills />);

    const fromDateInput = screen.getByLabelText("Từ ngày:");
    fireEvent.change(fromDateInput, {
      target: { value: "2025-11-01" },
    });

    expect(fromDateInput).toHaveValue("2025-11-01");
  });

  test("updates toDate when input changes", () => {
    render(<Bills />);

    const toDateInput = screen.getByLabelText("Đến ngày:");
    fireEvent.change(toDateInput, {
      target: { value: "2025-11-30" },
    });

    expect(toDateInput).toHaveValue("2025-11-30");
  });

  test("updates search input value", () => {
    render(<Bills />);

    const searchInput = screen.getByPlaceholderText("Tìm kiếm");
    fireEvent.change(searchInput, {
      target: { value: "John" },
    });

    expect(searchInput).toHaveValue("John");
  });

  /* ---------- LAYOUT ---------- */
  test("renders main wrapper with correct layout classes", () => {
    const { container } = render(<Bills />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("flex", "flex-col");
    expect(wrapper).toHaveClass("bg-white", "h-full");
  });
});
