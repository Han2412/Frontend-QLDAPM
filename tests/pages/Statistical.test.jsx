import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

/* ================= MOCK ENV ================= */
process.env.VITE_APP_API_URL = "http://localhost:3000";

/* ================= MOCK API SLICES ================= */
jest.mock("../../src/store/Slices/statisticSlice", () => ({
  useGetMonthlyStatisticQuery: () => ({
    data: [
      { month: 1, totalAmount: "1000000" },
      { month: 2, totalAmount: "1200000" },
      { month: 3, totalAmount: "1500000" },
    ],
    isLoading: false,
    error: null,
  }),
}));

jest.mock("../../src/store/Slices/predictRevenueSlice", () => ({
  usePredictRevenueMutation: () => [jest.fn(), { isLoading: false }],
}));

/* ================= MOCK MUI CHARTS ================= */
jest.mock("@mui/x-charts/LineChart", () => ({
  LineChart: () => <div data-testid="line-chart">Line Chart</div>,
}));

jest.mock("@mui/x-charts/BarChart", () => ({
  BarChart: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

/* ================= IMPORT COMPONENT AFTER MOCK ================= */
const Statistical = require("../../src/pages/Statistical").default;

/* ================= TEST SUITE ================= */
describe("Statistical Page", () => {
  test("renders page title", () => {
    render(<Statistical />);
    expect(screen.getByText(/Doanh Thu Theo Tháng/i)).toBeInTheDocument();
  });

  test("renders current year", () => {
    render(<Statistical />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  test("renders charts", () => {
    render(<Statistical />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  test("renders predict revenue button", () => {
    render(<Statistical />);
    const btn = screen.getByRole("button", { name: /Dự đoán doanh thu/i });
    expect(btn).toBeInTheDocument();
  });

  test("predict button is clickable", () => {
    render(<Statistical />);
    const btn = screen.getByRole("button", { name: /Dự đoán doanh thu/i });
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  test("wrapper has correct layout classes", () => {
    const { container } = render(<Statistical />);
    expect(container.firstChild).toHaveClass("bg-white", "p-6", "rounded-xl", "shadow");
  });
});
