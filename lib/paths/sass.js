module.exports = (function() {

    var FileSystem = require('../FileSystem');

    return function(config, options) {
        return [
            FileSystem.getFolderPath(config, options.name, options.folder) + '/**/*.{sass,scss}'
        ];
    };

}());
