module.exports = (function() {

    var gulp = require('gulp');
    var Server = require('karma').Server;

    return function(config, options) {

        return function karma(done) {
             new Server({
                configFile: config.get('karma.configFile'),
                action: options.action,
                singleRun: options.singleRun
            }, done).start();
        };
    };

}());
