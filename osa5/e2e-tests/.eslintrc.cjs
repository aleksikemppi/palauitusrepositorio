module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      'react/prop-types': 'error',
      'no-unused-vars': 'warn',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  