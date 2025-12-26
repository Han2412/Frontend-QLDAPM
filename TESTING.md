# Jest Unit Tests Guide

This document provides guidance on running and writing unit tests for the Frontend-QLDAPM project using Jest.

## Installation

Jest and testing dependencies have already been installed. To verify:

```bash
npm list jest @testing-library/react @testing-library/jest-dom babel-jest
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (recommended during development)
```bash
npm test -- --watch
```

### Run tests for a specific file
```bash
npm test -- Input.test.jsx
```

### Run tests with coverage report
```bash
npm test -- --coverage
```

### Run tests with verbose output
```bash
npm test -- --verbose
```

## Project Structure

```
tests/
├── components/
│   ├── Input.test.jsx           # TextField input component tests
│   ├── LoadingSpinner.test.jsx   # Loading spinner component tests
│   ├── NotFound.test.jsx         # 404 page tests
│   ├── PrivateRoute.test.jsx     # Route protection tests
│   ├── OrderCard.test.jsx        # Order card component tests
│   └── login.test.jsx            # Login page tests
├── store/
│   └── slices.test.js            # Redux slices tests
├── testUtils.js                  # Testing utilities and helpers
└── __mocks__/                    # Mock files for assets
    └── fileMock.js               # Mock for image imports
```

## Test Files Created

### 1. **Input.test.jsx** - TextField Component Tests
Tests the reusable Input component that wraps Material-UI TextField:
- Renders input with label
- Updates form state on change
- Handles password input type
- Disables input when in view mode
- Validates fullWidth variant

**Location:** `tests/components/Input.test.jsx`

### 2. **LoadingSpinner.test.jsx** - Loading Component Tests
Tests the loading spinner animation component:
- Renders spinner with correct dimensions
- Applies animate-spin animation
- Has correct border styling
- Flexbox layout validation

**Location:** `tests/components/LoadingSpinner.test.jsx`

### 3. **NotFound.test.jsx** - 404 Page Tests
Tests the 404 Not Found page:
- Displays correct error message
- Applies proper styling classes
- Renders heading with correct text size

**Location:** `tests/components/NotFound.test.jsx`

### 4. **PrivateRoute.test.jsx** - Route Protection Tests
Tests the PrivateRoute component for protected pages:
- Renders children when authenticated
- Accepts multiple children
- Properly protects routes

**Location:** `tests/components/PrivateRoute.test.jsx`

### 5. **OrderCard.test.jsx** - Order Card Component Tests
Tests the order card component displayed in kitchen/order management:
- Renders order information (staff, table)
- Displays order items with quantities and notes
- Button interaction and styling
- Multiple items rendering

**Location:** `tests/components/OrderCard.test.jsx`

### 6. **login.test.jsx** - Login Page Tests
Tests the authentication login page:
- Form rendering
- Input value changes
- Form submission
- Navigation after login
- Error handling

**Location:** `tests/components/login.test.jsx`

### 7. **slices.test.js** - Redux Store Tests
Structure for testing Redux slices:
- Category API endpoints
- Auth slice functionality
- Order state management
- Product endpoints

**Location:** `tests/store/slices.test.js`

## Testing Utilities

### Available Helpers in testUtils.js

```javascript
// Render component with Redux Provider and Router
renderWithProviders(<Component />)

// Mock localStorage
const mockStorage = mockLocalStorage()

// Mock window.matchMedia
mockMatchMedia()

// Create Redux store with initial state
const store = createMockStore({ initialState })
```

### Example Usage

```javascript
import { renderWithProviders } from '../testUtils'
import MyComponent from '../../src/MyComponent'

test('component with redux', () => {
  renderWithProviders(<MyComponent />)
})
```

## Jest Configuration

The project uses the following Jest configuration (`jest.config.cjs`):

- **Test Environment:** jsdom (browser-like environment)
- **Transform:** babel-jest (handles JSX and ESNext)
- **Module Mapping:** 
  - CSS modules mocked with identity-obj-proxy
  - Image imports mocked with fileMock.js
- **Setup File:** jest.setup.js (global test configuration)

## Writing New Tests

### Basic Test Template

```javascript
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Component from "../../src/Component"

describe("Component Name", () => {
  test("should render correctly", () => {
    render(<Component />)
    expect(screen.getByText("Expected Text")).toBeInTheDocument()
  })

  test("should handle user interaction", () => {
    render(<Component />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    // Add assertions
  })
})
```

### Common Testing Patterns

#### Testing Props
```javascript
test("should accept and use props", () => {
  render(<Component title="Test Title" />)
  expect(screen.getByText("Test Title")).toBeInTheDocument()
})
```

#### Testing Event Handlers
```javascript
test("should call onClick handler", () => {
  const mockHandler = jest.fn()
  render(<Button onClick={mockHandler}>Click me</Button>)
  fireEvent.click(screen.getByText("Click me"))
  expect(mockHandler).toHaveBeenCalled()
})
```

#### Testing with Redux
```javascript
import { renderWithProviders } from '../testUtils'

test("component connected to redux", () => {
  const initialState = { auth: { token: "test" } }
  renderWithProviders(<Component />, { initialState })
  // Test component with redux state
})
```

#### Testing Async Operations
```javascript
import { waitFor } from "@testing-library/react"

test("handles async operations", async () => {
  render(<Component />)
  fireEvent.click(screen.getByRole("button"))
  
  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument()
  })
})
```

## Mocking

### Mocking Modules
```javascript
jest.mock("../../store/Slices/authSlice", () => ({
  useLoginMutation: () => [jest.fn(), { isLoading: false }],
}))
```

### Mocking Functions
```javascript
const mockNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))
```

### Mocking localStorage
```javascript
beforeEach(() => {
  localStorage.clear()
})

test("stores data", () => {
  localStorage.setItem("key", "value")
  expect(localStorage.getItem("key")).toBe("value")
})
```

## Common Assertions

```javascript
// Element presence
expect(element).toBeInTheDocument()
expect(element).toBeVisible()

// Text content
expect(element).toHaveTextContent("text")
expect(element).toHaveValue("value")

// Attributes
expect(element).toHaveAttribute("href", "/path")
expect(element).toHaveClass("class-name")

// Disabled state
expect(button).toBeDisabled()
expect(button).not.toBeDisabled()

// Function calls
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith(args)
expect(mockFn).toHaveBeenCalledTimes(1)
```

## Debugging Tests

### View DOM output
```javascript
test("debug test", () => {
  const { debug } = render(<Component />)
  debug() // Prints current DOM to console
})
```

### Use screen queries
```javascript
// Find by role (recommended)
screen.getByRole("button", { name: /submit/i })

// Find by label text
screen.getByLabelText("Username")

// Find by placeholder
screen.getByPlaceholderText("Enter name")

// Find by text
screen.getByText("Click me")
```

## Coverage Goals

Aim for the following coverage percentages:
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

Check coverage with:
```bash
npm test -- --coverage
```

## Troubleshooting

### "Cannot find module" errors
- Ensure babel.config.js or .babelrc exists
- Check jest moduleNameMapper paths

### "ReferenceError: regeneratorRuntime is not defined"
- Add babel-polyfill or @babel/polyfill to test setup

### "window.matchMedia is not a function"
- Handled in jest.setup.js automatically

### Mock not working
- Clear mocks in beforeEach: `jest.clearAllMocks()`
- Ensure mock is before the import statement

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

1. Run existing tests: `npm test`
2. Add more component tests following the patterns shown
3. Increase code coverage to 80%+
4. Integrate tests into CI/CD pipeline
5. Run tests before committing: `npm test -- --bail`
