module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
      '<rootDir>/components/**/*.vue',
      '<rootDir>/pages/**/*.vue',
      '<rootDir>/pages/**/*.ts',
      '<rootDir>/components/**/*.ts'
    ],
  testEnvironment: 'jsdom'
};
