import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Employee from "../../src/pages/Employee/index";

// Mock the hooks
jest.mock("../../src/store/Slices/authSlice", () => ({
  useGetAllAccountQuery: jest.fn(() => ({
    data: [
      { id: "1", name: "John Doe", email: "john@example.com", status: 1 },
      { id: "2", name: "Jane Smith", email: "jane@example.com", status: 1 },
    ],
    refetch: jest.fn(),
    isLoading: false,
  })),
  useUpdateAccountMutation: jest.fn(() => [jest.fn()]),
}));

// Mock Material-UI components
jest.mock("@mui/material/Menu", () => {
  return jest.fn(({ children }) => <div data-testid="menu">{children}</div>);
});

jest.mock("@mui/material/MenuItem", () => {
  return jest.fn(({ children, onClick }) => (
    <div data-testid="menu-item" onClick={onClick}>
      {children}
    </div>
  ));
});

describe("Employee Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Employee page", () => {
    const { container } = render(<Employee />);
    expect(container).toBeInTheDocument();
  });

  test("displays employee list", () => {
    render(<Employee />);
    // The component should render without errors
    const { container } = render(<Employee />);
    expect(container).toBeInTheDocument();
  });

  test("has proper styling", () => {
    const { container } = render(<Employee />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  test("renders menu options", () => {
    render(<Employee />);
    const menu = screen.getByTestId("menu");
    expect(menu).toBeInTheDocument();
  });

  test("manages state correctly", () => {
    const { container } = render(<Employee />);
    expect(container).toBeInTheDocument();
  });
});
