module.exports = (function() {

    var plugins = require('gulp-load-plugins')();

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseJs(done) {
            var compilePipe = gulp.src(TaskRunner.paths.js(config, options));

            compilePipe.pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('{name}-{task}.js'.assign({
                name: options.name,
                task: 'js'
            })))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.get('paths.dist')))
            .on('end', function() {
                done();
            });
        };
    };

}());
