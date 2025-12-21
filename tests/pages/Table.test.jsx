import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../../src/pages/table/index";

// Mock ListTable component
jest.mock("../../src/pages/table/listTable", () => {
  return function DummyListTable() {
    return <div data-testid="list-table">List Table Component</div>;
  };
});

describe("Table Component", () => {
  test("renders Table page", () => {
    const { container } = render(<Table />);
    expect(container).toBeInTheDocument();
  });

  test("renders ListTable component", () => {
    const { getByTestId } = render(<Table />);
    expect(getByTestId("list-table")).toBeInTheDocument();
  });

  test("wraps ListTable in div", () => {
    const { container } = render(<Table />);
    const wrapper = container.firstChild;
    expect(wrapper.tagName).toBe("DIV");
  });

  test("renders without errors", () => {
    const { container } = render(<Table />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
