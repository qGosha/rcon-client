module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["prettier", "prettier/react", "eslint:recommended", "plugin:react/recommended"],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaOptions: {
      jsx: true,
    },
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "lines-around-comment": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // ignore variables that begin with _
    "jsx-max-props-per-line": 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.5',
    },
  },
}
