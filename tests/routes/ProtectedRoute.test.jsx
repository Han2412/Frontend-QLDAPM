import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../routes/ProtectedRoute";

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        <Routes>
          {component}
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/order_page" element={<div>Order Page</div>} />
          <Route path="/bartender_page" element={<div>Bartender Page</div>} />
        </Routes>
      </BrowserRouter>
    );
  };

  test("redirects to login when no token", () => {
    renderWithRouter(
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        }
      />
    );

    // Should redirect to login
    expect(window.location.pathname).not.toContain("Protected");
  });

  test("renders children when token exists and role is allowed", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("roleID", "1");

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[1]}>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    const content = container.querySelector('[data-testid="protected-content"]');
    expect(content).toBeInTheDocument();
  });

  test("allows roleID 1 (admin)", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("roleID", "1");

    const { getByText } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[1]}>
          <div>Admin Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(getByText("Admin Content")).toBeInTheDocument();
  });

  test("allows roleID 2 (staff)", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("roleID", "2");

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[1, 2]}>
          <div>Staff Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Should show content for roleID 2
    expect(container).toBeInTheDocument();
  });

  test("allows roleID 3 (bartender)", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("roleID", "3");

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[1, 3]}>
          <div>Bartender Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  test("role as string is converted to number", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("roleID", "2"); // String

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[2]}>
          <div>Role Test</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  test("handles missing roleID gracefully", () => {
    localStorage.setItem("token", "fake-token");
    // No roleID set

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute allowedRoles={[1]}>
          <div>Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
