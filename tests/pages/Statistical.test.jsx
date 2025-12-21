import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Statistical from "../../src/pages/Statistical/index";

// Mock the query hook
jest.mock("../../src/store/Slices/paymentSlide", () => ({
  useGetRevenueByYearQuery: jest.fn(() => ({
    data: [
      { month: 1, totalAmount: "1000000" },
      { month: 2, totalAmount: "1200000" },
      { month: 3, totalAmount: "1500000" },
      { month: 4, totalAmount: "1800000" },
      { month: 5, totalAmount: "2000000" },
      { month: 6, totalAmount: "2200000" },
      { month: 7, totalAmount: "2400000" },
      { month: 8, totalAmount: "2500000" },
      { month: 9, totalAmount: "2600000" },
      { month: 10, totalAmount: "2800000" },
      { month: 11, totalAmount: "3000000" },
      { month: 12, totalAmount: "3200000" },
    ],
    isLoading: false,
  })),
}));

// Mock Material-UI charts
jest.mock("@mui/x-charts/LineChart", () => ({
  LineChart: () => <div data-testid="line-chart">Line Chart</div>,
}));

jest.mock("@mui/x-charts/BarChart", () => ({
  BarChart: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

describe("Statistical Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Statistical page with title", () => {
    render(<Statistical />);
    expect(screen.getByText(/Doanh Thu Theo Tháng/)).toBeInTheDocument();
  });

  test("title has correct styling", () => {
    const { container } = render(<Statistical />);
    const title = container.querySelector("h2");
    expect(title).toHaveClass("text-[#4254FB]", "font-bold", "text-3xl");
  });

  test("renders predict revenue button", () => {
    render(<Statistical />);
    const button = screen.getByRole("button", { name: /Dự đoán doanh thu/i });
    expect(button).toBeInTheDocument();
  });

  test("button has correct styling", () => {
    render(<Statistical />);
    const button = screen.getByRole("button", { name: /Dự đoán doanh thu/i });
    expect(button).toHaveClass("bg-[#4254FB]", "text-white", "rounded-2xl");
  });

  test("button is clickable", () => {
    render(<Statistical />);
    const button = screen.getByRole("button", { name: /Dự đoán doanh thu/i });

    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    // Component should still be in document after click
    expect(button).toBeInTheDocument();
  });

  test("renders page with proper styling", () => {
    const { container } = render(<Statistical />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-white", "p-6", "rounded-xl", "shadow");
  });

  test("has centered title layout", () => {
    const { container } = render(<Statistical />);
    const titleContainer = container.querySelector(".flex.justify-center");
    expect(titleContainer).toBeInTheDocument();
  });

  test("has button in correct layout", () => {
    const { container } = render(<Statistical />);
    const buttonContainer = container.querySelector(".flex.justify-end");
    expect(buttonContainer).toBeInTheDocument();
  });

  test("displays year 2025 in title", () => {
    render(<Statistical />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  test("renders without errors", () => {
    const { container } = render(<Statistical />);
    expect(container).toBeInTheDocument();
  });
});
