module.exports = (function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var fs = require('fs');

    return function(config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseAngular(done) {
            return TaskRunner.ingredients.angularTemplates(config, options)()
                .then(function(templateFile) {
                    var paths = TaskRunner.paths.angular(config, options);
                    paths.push(templateFile);

                    var compilePipe = gulp.src(paths)
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ngAnnotate())
                    .pipe(plugins.concat('{name}-{task}.js'.assign({
                        name: options.name,
                        task: 'angular'
                    })))
                    .pipe(gulp.dest(config.get('paths.dist')))
                    .on('end', function() {
                        if (fs.existsSync(templateFile)) {
                            fs.unlinkSync(templateFile);
                        }
                    });

                    return compilePipe;
                });
        }
    };

}());
