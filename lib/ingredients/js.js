module.exports = (function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var TaskRunner = require('../TaskRunner');

    return function(config, options) {
        return function parseJs() {
            var compilePipe = gulp.src(TaskRunner.paths.js(config, options))
            .pipe(plugins.eslint('./eslintconfig.json'))
            .pipe(plugins.eslint.format('stylish'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('{name}-{task}.js'.assign({
                name: options.name,
                task: 'js'
            })))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.get('paths.dist')));

            return compilePipe;
        };
    };

}());
