import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Productlist from "../../src/pages/product/index";

/* =========================
   MOCK MODALS
========================= */
jest.mock("../../src/pages/product/ModalAddProduct", () => () => (
  <div>ModalAddProduct</div>
));

jest.mock("../../src/pages/product/ModalAddCategor", () => () => (
  <div>ModalAddCategor</div>
));

jest.mock("../../src/pages/product/ModalEditProduct", () => () => (
  <div>ModalEditProduct</div>
));

/* =========================
   MOCK RTK QUERY
========================= */
const mockDelete = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../src/store/Slices/categorySlide", () => ({
  useGetAllCategoriesQuery: () => ({
    data: [
      { id: "1", name: "Cơm" },
      { id: "2", name: "Bánh" },
    ],
    isLoading: false,
  }),
}));

jest.mock("../../src/store/Slices/productSlice", () => ({
  useGetAllProductsQuery: () => ({
    data: [
      {
        id: "1",
        name: "Cơm Chiên",
        price: "50000",
        categoryID: "1",
        imageURL: "test.png",
      },
    ],
    isLoading: false,
  }),
  useDeleteProductMutation: () => [
    mockDelete,
    { isLoading: false },
  ],
}));

/* =========================
   TEST SUITE
========================= */
describe("Productlist Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  test("renders page title", () => {
    render(<Productlist />);
    expect(screen.getByText("Danh sách sản phẩm")).toBeInTheDocument();
  });

  test("renders product name and price", () => {
    render(<Productlist />);

    expect(screen.getByText("Cơm Chiên")).toBeInTheDocument();
    expect(screen.getByText(/50000/)).toBeInTheDocument(); // ✅ FIX
  });

  test("renders category name using categoryID", () => {
    render(<Productlist />);

    const tbody = screen.getByRole("table").querySelector("tbody");
    expect(within(tbody).getByText("Cơm")).toBeInTheDocument();
  });

  test("opens add product modal", () => {
    render(<Productlist />);
    fireEvent.click(screen.getByText("Thêm"));
    expect(screen.getByText("ModalAddProduct")).toBeInTheDocument();
  });

  test("opens edit product modal", () => {
    render(<Productlist />);

    const tbody = screen.getByRole("table").querySelector("tbody");
    const buttons = within(tbody).getAllByRole("button");

    fireEvent.click(buttons[0]);
    expect(screen.getByText("ModalEditProduct")).toBeInTheDocument();
  });

  test("calls delete mutation when clicking delete", async () => {
    render(<Productlist />);

    const tbody = screen.getByRole("table").querySelector("tbody");
    const buttons = within(tbody).getAllByRole("button");

    fireEvent.click(buttons[1]);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("1");
    });
  });
});
