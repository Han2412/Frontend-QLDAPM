import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bills from "../../src/pages/Bills/index";

// Mock the query hook
jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useGetPaymentsByDateRangeQuery: jest.fn(() => ({
    data: [
      {
        id: "1",
        invoiceNumber: "INV001",
        amount: 100000,
        date: "2025-10-26",
      },
      {
        id: "2",
        invoiceNumber: "INV002",
        amount: 150000,
        date: "2025-10-27",
      },
    ],
    isLoading: false,
    error: null,
  })),
}));

describe("Bills Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Bills page with title", () => {
    render(<Bills />);
    expect(screen.getByText("Danh sách hóa đơn")).toBeInTheDocument();
  });

  test("renders date filter inputs", () => {
    render(<Bills />);
    const fromDateInput = screen.getByLabelText("Từ ngày:");
    const toDateInput = screen.getByLabelText("Đến ngày:");

    expect(fromDateInput).toBeInTheDocument();
    expect(toDateInput).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<Bills />);
    const searchInput = screen.getByPlaceholderText("Tìm kiếm");
    expect(searchInput).toBeInTheDocument();
  });

  test("updates fromDate when input changes", () => {
    render(<Bills />);
    const fromDateInput = screen.getByLabelText("Từ ngày:");

    fireEvent.change(fromDateInput, { target: { value: "2025-11-01" } });
    expect(fromDateInput).toHaveValue("2025-11-01");
  });

  test("updates toDate when input changes", () => {
    render(<Bills />);
    const toDateInput = screen.getByLabelText("Đến ngày:");

    fireEvent.change(toDateInput, { target: { value: "2025-11-30" } });
    expect(toDateInput).toHaveValue("2025-11-30");
  });

  test("has search functionality", () => {
    render(<Bills />);
    const searchInput = screen.getByPlaceholderText("Tìm kiếm");

    fireEvent.change(searchInput, { target: { value: "INV001" } });
    expect(searchInput).toHaveValue("INV001");
  });

  test("renders page with flex layout", () => {
    const { container } = render(<Bills />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("flex", "flex-col");
  });

  test("has proper styling classes", () => {
    const { container } = render(<Bills />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-white", "h-full");
  });
});
