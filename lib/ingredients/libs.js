module.exports = (function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();

    return function(config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseLibs() {
            var compilePipe = gulp.src(TaskRunner.paths.libs(config, options))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(options.name + '.libs.js'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.get('paths.dist')));

            return compilePipe;
        }
    };

}());
