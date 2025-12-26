import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../../src/components/Input";

describe("Input Component", () => {
  const defaultProps = {
    label: "Username",
    name: "username",
    value: "",
    onChange: jest.fn(),
  };

  test("renders input with label", () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("renders input with correct name attribute", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("name", "username");
  });

  test("renders input with correct value", () => {
    render(<Input {...defaultProps} value="testuser" />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveValue("testuser");
  });

  test("calls onChange when input value changes", () => {
    const mockonChange = jest.fn();
    render(
      <Input {...defaultProps} onChange={mockonChange} value="initial" />
    );

    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "newvalue" } });

    expect(mockonChange).toHaveBeenCalled();
  });

  test("renders as password input when type is password", () => {
    render(<Input {...defaultProps} type="password" label="Password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  test("renders as text input by default", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("type", "text");
  });

  test("disables input when isView is true", () => {
    render(<Input {...defaultProps} isView={true} />);
    const input = screen.getByLabelText("Username");
    expect(input).toBeDisabled();
  });

  test("input is enabled when isView is false", () => {
    render(<Input {...defaultProps} isView={false} />);
    const input = screen.getByLabelText("Username");
    expect(input).not.toBeDisabled();
  });

  test("renders fullWidth variant", () => {
    const { container } = render(<Input {...defaultProps} />);
    const textField = container.querySelector(".MuiTextField-root");
    expect(textField.className).toMatch(/fullWidth/);
  });
});
