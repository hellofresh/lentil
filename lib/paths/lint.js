module.exports = (function() {

    var FileSystem = require('../FileSystem');

    var angular = require('./angular');
    var angularTemplates = require('./angularTemplates');
    var js = require('./js');

    return function(config, options) {
        return [
            angular: [
                angular(config, options.name, 'angular'),
                angular(config, options.name, 'app')
            ].flatten(),
            js: js(config, options.name, 'js'),
            html: [
                angularTemplates(config, options.name, 'angular'),
                angularTemplates(config, options.name, 'app')
            ].flatten(),
        ];
    };

}());
