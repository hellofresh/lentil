module.exports = (function() {

    var plugins = require('gulp-load-plugins')();

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseSass() {
            var compilePipe = gulp.src(TaskRunner.paths.sass(config, options))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass(config.get('mergeDefault', {
                includePaths: [
                    config.get('paths.libs')
                ],
                outputStyle: 'expanded',
                sourceComments: true
            })).on('error', plugins.sass.logError))
            .pipe(plugins.importCss())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.get('paths.dist')));

            return compilePipe;
        }
    };

}());
