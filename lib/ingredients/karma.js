module.exports = (function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();

    return function(config, options) {
        var TaskRunner = require('../TaskRunner');

        return function karma() {
            var testPipe = gulp.src(TaskRunner.paths.karma(config, options))
            .pipe(plugins.karma({
                configFile: './karma.conf.js',
                action: options.action,
                singleRun: options.singleRun
            }));

            return testPipe;
        };
    };

}());
