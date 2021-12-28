module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 90,
            functions: 0,
            lines: 0,
        },
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!tsparticles-preset-confetti/.*)',
    ],
    setupFiles: ['<rootDir>/test/setupTests.ts'],
};