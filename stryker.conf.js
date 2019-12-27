module.exports = function(config) {
    config.set({
        mutator: 'typescript',
        packageManager: 'npm',
        reporters: ['clear-text', 'progress', 'dashboard'],
        testRunner: 'jest',
        transpilers: [],
        coverageAnalysis: 'off',
        tsconfigFile: 'tsconfig.json',
        mutate: [
		    'src/**/*.ts'
		]
    });
};
