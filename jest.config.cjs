const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const config = {
    coverageProvider:'v8',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/app/$1',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(firebase|@firebase|@stripe|stripe-js|@mui|@emotion|@heroicons|@heroicons/react)/)',
    ],
}

module.exports = createJestConfig(config)