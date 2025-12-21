import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "../../src/components/PrivateRoute";

describe("PrivateRoute Component", () => {
  test("renders children when authenticated", () => {
    const { container } = render(
      <BrowserRouter>
        <PrivateRoute>
          <div data-testid="protected-content">Protected Content</div>
        </PrivateRoute>
      </BrowserRouter>
    );

    const content = container.querySelector('[data-testid="protected-content"]');
    expect(content).toBeInTheDocument();
  });

  test("renders children element correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <PrivateRoute>
          <div>Test Protected Page</div>
        </PrivateRoute>
      </BrowserRouter>
    );

    expect(getByText("Test Protected Page")).toBeInTheDocument();
  });

  test("accepts multiple children", () => {
    const { getByText } = render(
      <BrowserRouter>
        <PrivateRoute>
          <div>Child 1</div>
          <div>Child 2</div>
        </PrivateRoute>
      </BrowserRouter>
    );

    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });
});
