import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // JS linting with browser + Node globals
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    // JSON linting
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    // Ignore auto-generated files
    ignores: ["package-lock.json", "node_modules/", "dist/"]
  },
  {
    // ESLint config file as module
    files: ["eslint.config.mjs"],
    languageOptions: {
      sourceType: "module"
    }
  }
]);