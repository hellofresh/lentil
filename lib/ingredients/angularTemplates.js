module.exports = (function() {

    var Q = require('q');
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var TaskRunner = require('../TaskRunner');

    return function(config, options) {
        return function parseAngularTemplates(done) {
            var deferred = Q.defer();

            var TEMPLATE_TMP_FILE = options.name + '-templates.js';
            var TMP_FOLDER = config.get('paths.tmp');

            var compilePipe = gulp.src(TaskRunner.paths.angularTemplates(config, options))
            .pipe(plugins.angularTemplatecache({
                module: 'lentil.{name}'.assign({
                    name: options.name
                }),
                filename: TEMPLATE_TMP_FILE,
                root: 'lentil/' + options.name + '/templates'
            }))
            .pipe(gulp.dest(TMP_FOLDER))
            .on('end', function() {
                deferred.resolve('{folder}/{file}'.assign({
                    folder: TMP_FOLDER,
                    file: TEMPLATE_TMP_FILE
                }));

                if (typeof done === 'function') {
                    done();
                }
            });

            return deferred.promise;
        };
    };

}());
