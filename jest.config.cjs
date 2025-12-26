

module.exports = {
  testEnvironment: "jsdom",            // Run tests in a browser-like environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",   // Use babel-jest to handle JSX/ESNext
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",  // Mock CSS imports
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",  // Mock image imports
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
