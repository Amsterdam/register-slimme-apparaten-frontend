module.exports = {
  verbose: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/*/RbGenerated*/*.{js,jsx,ts,tsx}',
    '!src/app.tsx',
    '!src/global-styles.js',
    '!src/*/*/Loadable.{js,jsx,ts,tsx}',
    '!src/static/*',
    '!src/**/definitions/*',
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  coverageReporters: ['lcov'],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['<rootDir>/internals/', '<rootDir>/src/static'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/internals/testing/test-bundler.js'],
  testRegex: '.*\\.test\\.(j|s)s$',
  testEnvironment: './internals/testing/jest-environment-jsdom-global-fix',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
