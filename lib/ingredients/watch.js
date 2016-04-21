module.exports = (function() {

    return function(gulp, config, options) {
        return function watch() {
            gulp.watch(options.files, options.tasks);
        };
    };

}());
