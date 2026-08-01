import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // chemin vers votre app Next.js, pour charger next.config.js et .env automatiquement
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // reproduit votre alias @/ existant, sinon Jest ne le comprendrait pas
  },
};

export default createJestConfig(config);