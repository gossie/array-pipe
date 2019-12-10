module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ["jasmine", "karma-typescript"],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-typescript')
        ],
        files: [{
            pattern: 'src/**/*.ts'
        }],
        preprocessors: {
            'src/**/*.ts': 'karma-typescript'
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                module: "commonjs",
                sourceMap: true,
                target: "es5",
                lib: [ "es2015", "dom" ],
            }
        },
        reporters: ["dots", "karma-typescript"],
        browsers: ['Firefox'],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [
                    '--headless',
                    '--remote-debugging-port=9333',
                    '--no-sandbox'
                ]
            }
        },
        singleRun: false
    });
};
