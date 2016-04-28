module.exports = (function() {

    var FileSystem = require('../FileSystem');

    var angular = require('./angular');
    var angularTemplates = require('./angularTemplates');
    var js = require('./js');

    return function(config, options) {
        return {
            angular: [
                angular(config, {
                    name: options.name,
                    folder: 'angular'
                }),
                angular(config, {
                    name: options.name,
                    folder: 'app'
                })
            ].flatten(),
            js: js(config, {
                name: options.name,
                folder: 'js'
            }),
            html: [
                angularTemplates(config, {
                    name: options.name,
                    folder: 'angular'
                }),
                angularTemplates(config, {
                    name: options.name,
                    folder: 'app'
                })
            ].flatten(),
        };
    };

}());
