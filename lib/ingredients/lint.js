module.exports = (function() {

    var CLIEngine = require('eslint').CLIEngine;
    var HTMLHint  = require('htmlhint').HTMLHint;
    var gutil = require('gulp-util');
    var fs = require('fs');
    var glob = require('multi-glob').glob;
    var Q = require('q');

    return function(gulp, config, options) {
        var TaskRunner = require('../TaskRunner');

        return function parseLint(done) {
            var paths = TaskRunner.paths.lint(config, options);

            var errorCount = 0;

            runJsLinter({
                baseConfig: {
                    extends: 'eslint:recommended',
                    plugins: [
                        'angular'
                    ]
                },
                rules: {
                    'angular/module-getter': 0,
                    'angular/module-setter': 0,
                    'angular/controller-as': 0
                }
            }, paths.angular)
            .then(function(result) {
                errorCount += result;

                return runJsLinter({
                    extends: 'eslint:recommended'
                }, paths.js);
            })
            .then(function(result) {
                errorCount += result;

                return runHtmlLinter({
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': false,
                    'tag-pair': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true,
                    'attr-no-duplication': true,
                    'title-require': true
                }, paths.html);
            })
            .then(function(result) {
                errorCount += result;

                global.shouldFailOnError = true;

                var sequence = gulp.seq.join(' ');
                if (sequence.match('-watch') || sequence.endsWith(' lint')) {
                    global.shouldFailOnError = false;
                }

                if (errorCount && global.shouldFailOnError) {
                    throw new Error(errorCount + ' lint errors are found.');
                }

                console.log(result);

                setTimeout(function() {
                    done();
                }, 1000);
            })
            .catch(function(e) {
                throw e;
            });
        }

        function runJsLinter(defaultConfig, paths) {
            return (function() {
                var deferred = Q.defer();

                glob(paths, function(err, files) {
                    console.log(files);
                    deferred.resolve(files);
                });

                return deferred.promise;
            }()).then(function(result) {
                var cli = new CLIEngine(config.mergeDefault('plugins.eslint', defaultConfig));

                var report = cli.executeOnFiles(result.flatten());

                var errorCount = report.results.count(function(result) {
                    return result.errorCount;
                });

                var formatter = cli.getFormatter();

                console.log(formatter(report.results));

                return errorCount;
            });
        }

        function runHtmlLinter(defaultConfig, paths) {
            paths = 'length' in paths ? paths : [paths];

            return Q.all(paths.map(function(path) {
                if (path.startsWith('!')) {
                    return Q.resolve([]);
                }

                var deferred = Q.defer();

                glob(path, function(err, files) {
                    reports = files.map(function(file) {
                        var result = HTMLHint.verify(fs.readFileSync(file).toString(), config.mergeDefault('plugins.htmlhint', defaultConfig));

                        return formatOutput(result, file);
                    });

                    deferred.resolve(reports);
                });

                return deferred.promise;
            })).then(function(result) {
                var reports = result.flatten();

                return reports.count(function(result) {
                    return result.errorCount;
                });
            });
        }

        function formatOutput(report, file) {
            if (!report.length) {
                return {
                    success: true
                };
            }

            var filePath = (file || 'stdin');

            var messages = report.filter(function (err) {
                return err;
            }).map(function (err) {
                return {
                    file: filePath,
                    error: err
                };
            });

            var output = {
                errorCount: messages.length,
                success: false,
                messages: messages,
                options: options
            };

            return output;
        };
    };

}());
