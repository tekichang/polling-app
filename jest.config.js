module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)
    '^.+\\.(ts|tsx)
};

: ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
};

: '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)
};

: ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
};

