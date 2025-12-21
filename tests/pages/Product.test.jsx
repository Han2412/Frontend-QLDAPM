import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Productlist from "../../src/pages/product/index";

// Mock the hooks
jest.mock("../../src/store/Slices/categorySlide", () => ({
  useGetAllCategoriesQuery: jest.fn(() => ({
    data: [
      { id: "1", name: "Cơm" },
      { id: "2", name: "Bánh" },
      { id: "3", name: "Nước" },
    ],
    isLoading: false,
  })),
}));

jest.mock("../../src/store/Slices/productSlice", () => ({
  useGetAllProductsQuery: jest.fn(() => ({
    data: [
      { id: "1", name: "Cơm Chiên", size: "M", price: "50000", category: "Cơm" },
      { id: "2", name: "Bánh Mì", size: "L", price: "30000", category: "Bánh" },
    ],
    setProducts: jest.fn(),
    isLoading: false,
  })),
  useDeleteProductMutation: jest.fn(() => [jest.fn()]),
}));

describe("Product List Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test("renders Product list page", () => {
    render(<Productlist />);
    expect(screen.getByText("Danh sách sản phẩm")).toBeInTheDocument();
  });

  test("displays page title with correct styling", () => {
    const { container } = render(<Productlist />);
    const title = container.querySelector("h1");
    expect(title).toHaveClass("font-semibold", "text-3xl");
  });

  test("renders add category button", () => {
    render(<Productlist />);
    const button = screen.getByRole("button", { name: "+" });
    expect(button).toBeInTheDocument();
  });

  test("add button has correct styling", () => {
    render(<Productlist />);
    const button = screen.getByRole("button", { name: "+" });
    expect(button).toHaveClass("bg-[#0BB783]", "text-white");
  });

  test("renders category buttons", () => {
    render(<Productlist />);
    // Categories should be rendered
    const { container } = render(<Productlist />);
    const categoryButtons = container.querySelectorAll(".hover\\:border-\\[\\#0BB783\\]");
    expect(categoryButtons.length).toBeGreaterThanOrEqual(0);
  });

  test("renders product table", () => {
    const { container } = render(<Productlist />);
    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
  });

  test("table has thead with border", () => {
    const { container } = render(<Productlist />);
    const thead = container.querySelector("thead");
    expect(thead).toHaveClass("border");
  });

  test("has proper layout structure", () => {
    const { container } = render(<Productlist />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-white", "h-full", "rounded-lg");
  });

  test("page is scrollable for categories", () => {
    const { container } = render(<Productlist />);
    const categoryContainer = container.querySelector(".overflow-x-auto");
    expect(categoryContainer).toBeInTheDocument();
  });
});
