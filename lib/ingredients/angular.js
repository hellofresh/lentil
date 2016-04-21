module.exports = (function() {

    var plugins = require('gulp-load-plugins')();
    var fs = require('fs');

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseAngular(done) {
            TaskRunner.ingredients.angularTemplates(gulp, config, options)()
                .then(function(templateFile) {
                    var paths = TaskRunner.paths.angular(config, options);

                    var compilePipe = gulp.src(paths)
                    .pipe(plugins.eslint(config.mergeDefault('plugins.eslint', {
                        plugins: [
                            'angular'
                        ],
                        rules: {
                            'angular/module-getter': 0,
                            'angular/module-setter': 0
                        }
                    })))
                    .pipe(plugins.eslint.format('stylish'))
                    .pipe(plugins.addSrc.append(templateFile))
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ngAnnotate(config.mergeDefault('plugins.ngAnnotate')))
                    .pipe(plugins.concat('{name}-{task}.js'.assign({
                        name: options.name,
                        task: 'angular'
                    })))
                    .pipe(gulp.dest(config.get('paths.dist')))
                    .on('end', function() {
                        if (templateFile && fs.existsSync(templateFile)) {
                            fs.unlinkSync(templateFile);
                        }

                        done();
                    });
                });
        }
    };

}());
