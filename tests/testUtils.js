import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

/**
 * Custom render function that wraps components with necessary providers
 * Usage: renderWithProviders(<Component />)
 */
export const renderWithProviders = (
  component,
  {
    initialState = {},
    store = mockStore(initialState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { ...render(component, { wrapper: Wrapper, ...renderOptions }), store };
};

/**
 * Mock localStorage
 */
export const mockLocalStorage = () => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
};

/**
 * Mock window.matchMedia
 */
export const mockMatchMedia = () => {
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
};

/**
 * Create mock Redux store with initial state
 */
export const createMockStore = (initialState = {}) => {
  return mockStore(initialState);
};

export default { renderWithProviders, mockLocalStorage, mockMatchMedia, createMockStore };
