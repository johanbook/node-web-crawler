module.exports = {
  coverageThreshold: {
    global: {
      branches: 23,
      functions: 55,
      lines: 60,
      statements: 57,
    },
  },
  preset: "ts-jest",
  setupFiles: ["./src/setupTests.ts"],
  testEnvironment: "node",
};
