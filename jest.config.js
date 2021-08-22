module.exports = {
  coverageThreshold: {
    global: {
      branches: 96,
      functions: 100,
      lines: 97,
      statements: 97,
    },
  },
  preset: "ts-jest",
  setupFiles: ["./src/setupTests.ts"],
  testEnvironment: "node",
};
