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
    'plugin:redux-saga/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  globals: {
    L: true,
  },
  overrides: [
    {
      extends: [
        'plugin:testing-library/react',
      ],
      files: ['**/*.test.*'],
      rules: {
        'testing-library/prefer-screen-queries': 1,
        'testing-library/render-result-naming-convention': 1,
        'testing-library/no-container': 1,
        'testing-library/no-node-access': 1
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  root: true,
  rules: {
    'import/first': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-empty-function': 1,
    'import/order': 'off',
    'no-restricted-imports': 1, 
    'no-undef': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'promise/no-callback-in-promise': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'redux-saga/no-unhandled-errors': 'off',
    'require-yield': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-import-assign': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  }
}
