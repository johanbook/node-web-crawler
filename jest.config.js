module.exports = {
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 33,
      lines: 50,
      statements: 47,
    },
  },
  preset: "ts-jest",
  setupFiles: ["./src/setupTests.ts"],
  testEnvironment: "node",
};
