module.exports = {
  coverageThreshold: {
    global: {
      branches: 59,
      functions: 100,
      lines: 89,
      statements: 87,
    },
  },
  preset: "ts-jest",
  setupFiles: ["./src/setupTests.ts"],
  testEnvironment: "node",
};
