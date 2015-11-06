module.exports = (function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();

    return function(config, options) {
        return function deploy(done) {
            var jsCompilePipe = gulp.src([
                config.get('paths.dist') + '/**/*.js',
                '!' + config.get('paths.dist') + '/**/*.min.js'
            ])
            .pipe(plugins.uglify({
                mangle: false
            }))
            .pipe(plugins.rename({
                suffix: '.min'
            }))
            .pipe(plugins.size({
                showFiles: true
            }))
            .pipe(gulp.dest(config.get('paths.dist')))
            .on('end', function() {
                var cssCompilePipe = gulp.src([
                    config.get('paths.dist') + '/**/*.css',
                    '!' + config.get('paths.dist') + '/**/*.min.css'
                ])
                .pipe(plugins.csso())
                .pipe(plugins.minifyCss({
                    compatibility: 'ie9',
                    aggressiveMerging: true,
                    debug: true,
                    processImport: true
                }))
                .pipe(plugins.size({
                    showFiles: true
                }))
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(config.get('paths.dist')))
                .on('end', function() {
                    done();
                });
            });
        };
    };

}());
