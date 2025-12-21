# Jest Unit Tests - Quick Start Guide

## 🚀 Getting Started

### 1. Run All Tests
```bash
npm test
```

### 2. Run Tests in Watch Mode (Development)
```bash
npm test -- --watch
```

### 3. Generate Coverage Report
```bash
npm test -- --coverage
```

## 📁 Test Files Summary

### Component Tests (tests/components/)
| Test File | Component | Tests |
|-----------|-----------|-------|
| `Input.test.jsx` | Input/TextField | 8 tests - form input handling |
| `LoadingSpinner.test.jsx` | Loading animation | 6 tests - spinner styling & animation |
| `NotFound.test.jsx` | 404 page | 4 tests - error page rendering |
| `PrivateRoute.test.jsx` | Route protection | 3 tests - route authentication |
| `OrderCard.test.jsx` | Order display card | 8 tests - order data rendering |
| `Header.test.jsx` | Header layout | 9 tests - header display & styling |
| `Sidebar.test.jsx` | Navigation sidebar | 6 tests - navigation & logout |
| `LayoutAdmin.test.jsx` | Admin layout wrapper | 7 tests - layout structure |

### Page Tests (tests/pages/)
| Test File | Page | Tests |
|-----------|------|-------|
| `Bills.test.jsx` | Bills page | 8 tests - date filtering, display |
| `Home.test.jsx` | Dashboard home | 5 tests - homepage layout |
| `Employee.test.jsx` | Employee management | 6 tests - employee CRUD |
| `Product.test.jsx` | Product management | 6 tests - product operations |
| `Sales.test.jsx` | Sales/Payment | 6 tests - payment handling |
| `Statistical.test.jsx` | Statistics & charts | 7 tests - chart data, calculations |
| `PatenderPage.test.jsx` | Bartender interface | 8 tests - bartender layout |
| `AdditionalPages.test.jsx` | Misc components | 12 tests - utility functions |

### Route Tests (tests/routes/)
| Test File | Route | Tests |
|-----------|-------|-------|
| `ProtectedRoute.test.jsx` | Protected routes | 7 tests - role-based access |

### Store Tests (tests/store/)
| Test File | Store | Tests |
|-----------|-------|-------|
| `slices.test.js` | Redux slices | 8 tests - store structure |

**Total: 130+ test cases**

## 📊 Test Coverage

After running tests, view the coverage report:
```bash
npm test -- --coverage
```

This will show:
- **Statements:** % of code statements executed
- **Branches:** % of conditional branches tested
- **Functions:** % of functions tested
- **Lines:** % of lines executed

## 🔧 Common Commands

```bash
# Run specific test file
npm test Input.test.jsx

# Run tests matching a pattern
npm test -- --testNamePattern="Login"

# Run with verbose output
npm test -- --verbose

# Stop on first test failure
npm test -- --bail

# Run only changed tests
npm test -- --onlyChanged

# Update snapshots
npm test -- --updateSnapshot
```

## 📝 Writing New Tests

Create a test file in the appropriate `tests/` subdirectory:

```javascript
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import MyComponent from "../../src/MyComponent"

describe("MyComponent", () => {
  test("renders correctly", () => {
    render(<MyComponent />)
    expect(screen.getByText("Expected")).toBeInTheDocument()
  })
})
```

## 🎯 Test Best Practices

1. **Test user behavior** - not implementation details
2. **Use semantic queries** - `getByRole`, `getByLabelText`, `getByText`
3. **Clear mock setup** - use `beforeEach` to reset mocks
4. **Meaningful test names** - describe what is being tested
5. **Avoid testing library internals** - focus on user interactions

## 🐛 Debugging

View the DOM in test:
```javascript
const { debug } = render(<Component />)
debug()
```

Use `screen.logTestingPlaygroundURL()` to get a testing playground link.

## ✅ Current Test Coverage

### Core Components
- ✅ Input component (Text, Password, Disabled states)
- ✅ Loading spinner (Animation, styling)
- ✅ NotFound page (404 error display)
- ✅ PrivateRoute (Authentication flow)
- ✅ OrderCard (Data rendering)

### Layout Components
- ✅ Header (User info, avatar, styling)
- ✅ Sidebar (Navigation, logout, routing)
- ✅ AdminLayout (Layout structure, Outlet)

### Pages
- ✅ Login page (Authentication, form handling)
- ✅ Dashboard/Home (Homepage layout)
- ✅ Bills page (Date filtering, data display)
- ✅ Employee management (CRUD operations)
- ✅ Product management (Product operations)
- ✅ Sales/Payment (Payment creation)
- ✅ Statistics (Chart data, calculations)
- ✅ PatenderPage (Bartender interface)

### Routes
- ✅ ProtectedRoute (Role-based access)

### Store
- ✅ Redux slices (Store structure, endpoints)

## 📦 Dependencies

Already installed:
- `jest` - Test runner
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - Custom jest matchers
- `babel-jest` - Babel transformer
- `redux-mock-store` - Mock Redux store

## 🔗 Resources

- [Jest Docs](https://jestjs.io)
- [React Testing Library](https://testing-library.com)
- [Testing React Components](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 📋 Next Steps

1. Review test files in `tests/` directory
2. Run `npm test` to execute all tests
3. Add tests for remaining components
4. Aim for 80%+ code coverage
5. Integrate tests into CI/CD pipeline

---

**Tip:** Run `npm test -- --watch` while developing to get instant feedback!
