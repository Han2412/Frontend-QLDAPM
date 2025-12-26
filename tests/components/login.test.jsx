import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../src/pages/Ath/Login";

// mock react-router
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// mock RTK Query
const mockLogin = jest.fn();
jest.mock("../../src/store/Slices/authSlice", () => ({
  useLoginMutation: () => [mockLogin, { data: null, error: null, isLoading: false }],
}));

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  test("render form login", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Tên đăng nhập")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mật khẩu")).toBeInTheDocument();
    expect(screen.getByText("Đăng nhập")).toBeInTheDocument();
  });

  test("nhập username và password", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Tên đăng nhập"), {
      target: { value: "admin", name: "name" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mật khẩu"), {
      target: { value: "123456", name: "password" },
    });

    expect(screen.getByPlaceholderText("Tên đăng nhập")).toHaveValue("admin");
    expect(screen.getByPlaceholderText("Mật khẩu")).toHaveValue("123456");
  });

  test("login thành công roleID = 1 → navigate '/'", async () => {
    mockLogin.mockResolvedValue({
      data: { token: "fake-token", roleID: 1 },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Tên đăng nhập"), {
      target: { value: "admin", name: "name" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mật khẩu"), {
      target: { value: "123456", name: "password" },
    });

    fireEvent.click(screen.getByText("Đăng nhập"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        name: "admin",
        password: "123456",
      });

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "token",
        "fake-token"
      );

      expect(localStorage.setItem).toHaveBeenCalledWith("roleID", 1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("login thành công roleID = 2 → navigate '/order_page'", async () => {
    mockLogin.mockResolvedValue({
      data: { token: "fake-token", roleID: 2 },
    });

    render(<Login />);

    fireEvent.click(screen.getByText("Đăng nhập"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/order_page");
    });
  });

  test("login thất bại → alert", async () => {
    mockLogin.mockResolvedValue({});

    render(<Login />);

    fireEvent.click(screen.getByText("Đăng nhập"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Đăng nhập thất bại, vui lòng kiểm tra lại!"
      );
    });
  });
});
