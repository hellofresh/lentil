module.exports = (function() {

    var FileSystem = require('../FileSystem');

    return function(config, options) {
        var libs = config.get('karma.files', []);

        return [
            libs,
            config.get('paths.modules') + '/**/*.js',
            config.get('paths.modules') + '/**/*Spec.js'
        ].flatten();
    };

}());
