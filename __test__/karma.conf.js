module.exports = function(config) {

    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            './modules/**/*.js',
            './modules/**/*Spec.js'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        singleRun: true
    });

};
