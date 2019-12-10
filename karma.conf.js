module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-webpack')
        ],
        files: [{
            pattern: 'src/**/*.spec.ts'
        }],
        preprocessors: {
            'src/**/*.spec.ts': ['webpack']
        },
        webpack: require('./webpack.config'),
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
