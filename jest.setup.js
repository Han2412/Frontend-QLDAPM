require("@testing-library/jest-dom");
// Ensure `React` is available globally for transformed JSX that expects it
global.React = require("react");

// Polyfill TextEncoder/TextDecoder for libraries that expect them (react-router)
const util = require('util');
if (typeof global.TextEncoder === 'undefined') global.TextEncoder = util.TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = util.TextDecoder;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock RTK Query / store slice modules that reference import.meta (Vite) so they
// don't execute during tests and cause "import.meta" parse errors.
const path = require("path");
const root = path.resolve(__dirname);
const sliceNames = [
  "orderSlice",
  "productSlice",
  "categorySlide",
  "paymentSlide",
  "itemSlice",
  "authSlice",
  "Table",
];

sliceNames.forEach((name) => {
  const p = path.join(root, "src", "store", "Slices", `${name}.js`);
  try {
    // Provide a proxy that returns a noop hook implementation for any exported
    // hook (e.g. useGetXQuery). This prevents Vite-specific code from running.
    const factory = () => {
      const handler = {
        get: (_target, prop) => {
          const name = String(prop || "");
          if (name.includes("Mutation")) {
            return jest.fn(() => [jest.fn(), { isLoading: false }]);
          }
          if (name.includes("Query")) {
            return jest.fn(() => ({ data: null, isLoading: false }));
          }
          return jest.fn();
        },
      };
      return new Proxy({}, handler);
    };
    // Jest requires the second argument to be an inline function expression
    // so wrap the factory call in an inline arrow function.
    jest.mock(p, () => factory());
  } catch (e) {
    // ignore if module path doesn't exist
  }
});
