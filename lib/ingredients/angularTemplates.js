module.exports = (function() {

    var Q = require('q');
    var plugins = require('gulp-load-plugins')();

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseAngularTemplates(done) {
            var deferred = Q.defer();

            var TEMPLATE_TMP_FILE = options.name + '-templates.js';
            var TMP_FOLDER = config.get('paths.tmp');
            var ROOT_PREFIX = config.get('paths.rootPrefix');

            var compilePipe = gulp.src(TaskRunner.paths.angularTemplates(config, options));

            compilePipe.pipe(plugins.angularTemplatecache(config.mergeDefault('plugins.angularTemplatecache', {
                module: 'lentil.{name}'.assign({
                    name: options.name
                }),
                filename: TEMPLATE_TMP_FILE,
                root: '{prefix}lentil/modules/{name}/app'.assign({
                    name: options.name,
                    prefix: (ROOT_PREFIX && ROOT_PREFIX.length) ? ROOT_PREFIX : ''
                })
            })))
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
