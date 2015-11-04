module.exports = (function() {

    var FileSystem = require('../FileSystem');

    return function(config, options) {
        return [
            config.get('paths.modules') + '/**/*Spec.js'
        ];
    };

}());
