/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
   globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.app.json"
    }
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
    "!vite.config.ts",
    "!**/coverage/**",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "setupTests.ts",
    "vite-env.d.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
