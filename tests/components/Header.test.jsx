import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../src/components/Layouts/Header";

// Mock image
jest.mock("../../src/assets/images/Avatar.png", () => "avatar.png");

describe("Header Component", () => {
  test("renders header component", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("has correct height and spacing", () => {
    const { container } = render(<Header />);
    const header = container.firstChild;
    expect(header).toHaveClass("h-20", "flex", "justify-between", "p-4");
  });

  test("renders with white background and shadow", () => {
    const { container } = render(<Header />);
    const header = container.firstChild;
    expect(header).toHaveClass("bg-white", "shadow");
  });

  test("displays employee name", () => {
    render(<Header />);
    expect(screen.getByText("Tên nhân viên")).toBeInTheDocument();
  });

  test("displays employee position", () => {
    render(<Header />);
    expect(screen.getByText("Tên chức vụ")).toBeInTheDocument();
  });

  test("renders avatar image", () => {
    const { container } = render(<Header />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  test("avatar has correct styling", () => {
    const { container } = render(<Header />);
    const img = container.querySelector("img");
    expect(img).toHaveClass("w-12", "h-12");
  });

  test("user info section has correct styling", () => {
    const { container } = render(<Header />);
    const userInfo = container.querySelector(".flex-col");
    expect(userInfo).toHaveClass("flex", "flex-col", "font-semibold");
  });

  test("position text is gray", () => {
    const { container } = render(<Header />);
    const positionText = screen.getByText("Tên chức vụ");
    expect(positionText).toHaveClass("text-sm", "text-gray-400");
  });
});
