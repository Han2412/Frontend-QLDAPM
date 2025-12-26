import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Employee from "../../src/pages/Employee/index";

/* ================= MOCK RTK QUERY ================= */
jest.mock("../../src/store/Slices/authSlice", () => ({
  useGetAllAccountQuery: () => ({
    data: [],
    isLoading: false,
    refetch: jest.fn(),
  }),

  useGetOneAccountQuery: () => ({
    data: null,
    isLoading: false,
    isSuccess: false,
    refetch: jest.fn(),
  }),

  useUpdateAccountMutation: () => [
    jest.fn(),
    { isLoading: false },
  ],

  useRegisterMutation: () => [
    jest.fn(),
    { isLoading: false },
  ],
}));

/* ================= MOCK MUI ================= */
jest.mock("@mui/material/Menu", () => ({ children }) => (
  <div data-testid="menu">{children}</div>
));

jest.mock("@mui/material/MenuItem", () => ({ children }) => (
  <div data-testid="menu-item">{children}</div>
));

describe("Employee Component", () => {
  test("renders employee page title", () => {
    render(<Employee />);
    expect(
      screen.getByText("Danh sách nhân viên")
    ).toBeInTheDocument();
  });

  test("renders add employee button", () => {
    render(<Employee />);
    expect(
      screen.getByRole("button", { name: /thêm nhân viên/i })
    ).toBeInTheDocument();
  });

  test("renders employee table headers", () => {
    render(<Employee />);

    expect(screen.getByText("STT")).toBeInTheDocument();
    expect(screen.getByText("Tên")).toBeInTheDocument();
    expect(screen.getByText("SDT")).toBeInTheDocument();
    expect(screen.getByText("Chức vụ")).toBeInTheDocument();
    expect(screen.getByText("Trạng thái")).toBeInTheDocument();
  });

  test("renders action menu", () => {
    render(<Employee />);

    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getAllByTestId("menu-item").length).toBeGreaterThan(0);
  });
});
