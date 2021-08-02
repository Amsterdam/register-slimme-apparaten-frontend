// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam

module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:redux-saga/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  globals: {
    L: true,
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      rules: {},
    },
    {
      extends: ['plugin:@typescript-eslint/recommended'],
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {},
    },
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  rules: {
    'no-console': 'error',
    'no-redeclare': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
