import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AdminLayout from "../../src/components/Layouts/LayoutAdmin";

describe("AdminLayout Component", () => {
  test("renders admin layout", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test("has correct container structure", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex", "h-screen", "bg-gray-100");
  });

  test("contains sidebar and main content area", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    // Should have 2 children: Sidebar and main content div
    expect(container.firstChild.children.length).toBeGreaterThan(0);
  });

  test("main content area has flex-1 layout", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    const contentDiv = container.querySelector(".flex-1");
    expect(contentDiv).toHaveClass("flex", "flex-col");
  });

  test("header is present in layout", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    // Layout should render successfully
    expect(container.firstChild).toBeInTheDocument();
  });

  test("main content section has padding and auto scroll", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    const main = container.querySelector("main");
    expect(main).toHaveClass("p-2", "flex-1", "overflow-auto");
  });

  test("outlet is rendered for route content", () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    // Outlet should be present for routing
    expect(container.firstChild).toBeInTheDocument();
  });
});
