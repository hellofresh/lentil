module.exports = (function() {

    var plugins = require('gulp-load-plugins')();
    var fs = require('fs');

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseAngular(done) {
            global.shouldFailOnError = true;

            if (gulp.seq.join('').match('-watch')) {
                global.shouldFailOnError = false;
            }

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
                    'angular/module-setter': 0,
                    'angular/controller-as': 0
                }
            })))
            .pipe(plugins.eslint.format('stylish'));

            if (global.shouldFailOnError) {
                eslintPipe.pipe(plugins.eslint.failAfterError());
            }

            eslintPipe.on('end', function() {
                var htmlLintPipe = gulp.src(paths.html);

                htmlLintPipe.pipe(plugins.htmlhint(config.mergeDefault('plugins.htmlhint', {
                    'doctype-first': false
                })))
                .pipe(plugins.htmlhint.reporter('htmlhint-stylish'))

                if (global.shouldFailOnError) {
                    htmlLintPipe.pipe(plugins.htmlhint.failReporter());
                }

                htmlLintPipe.on('end', function() {
                    done();
                });
            });
        }
    };

}());
