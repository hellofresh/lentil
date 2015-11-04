module.exports = (function() {

    var gulp = require('gulp');

    return function(config, options) {
        return function watch() {
            gulp.watch(options.files, options.tasks);
        };
    };

}());
