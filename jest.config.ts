export default {
  clearMocks: true,
  coverageDirectory: 'reports/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/src/db/queries/', '/src/common/types/response'],
  coverageProvider: 'v8',
  coverageReporters: ['html', 'text-summary'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  maxWorkers: '25%',
  modulePathIgnorePatterns: ['<rootDir>/dist/', 'data.ts'],
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports/unit-tests',
        outputName: 'junit.xml',
      },
    ],
  ],

  setupFiles: ['dotenv/config', '<rootDir>/tests/setup.ts'],
  testEnvironment: 'node',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  verbose: true,
};
