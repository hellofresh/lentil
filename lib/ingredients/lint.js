module.exports = (function() {

    var plugins = require('gulp-load-plugins')();
    var fs = require('fs');

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseAngular(done) {
            var paths = TaskRunner.paths.lint(config, options);

            var eslintPipe = gulp.src([
                paths.js,
                paths.angular
            ].flatten());

            eslintPipe.pipe(plugins.eslint(config.mergeDefault('plugins.eslint', {
                plugins: [
                    'angular'
                ],
                rules: {
                    'angular/module-getter': 0,
                    'angular/module-setter': 0
                }
            })))
            .pipe(plugins.eslint.format('stylish'))
            .pipe(plugins.eslint.failAfterError())
            .on('end', function() {
                var htmlLintPipe = gulp.src(paths.html);

                htmlLintPipe.pipe(plugins.htmlhint(config.mergeDefault('plugins.htmlhint', {
                    'doctype-first': false
                })))
                .pipe(plugins.htmlhint.reporter('htmlhint-stylish'))
                .pipe(plugins.htmlhint.failAfterError())
                .on('end', function() {
                    done();
                });
            });
        }
    };

}());
