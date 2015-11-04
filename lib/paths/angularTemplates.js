module.exports = (function() {

    var FileSystem = require('../FileSystem');

    return function(config, options) {
        var angularBasePath = FileSystem.getFolderPath(config, options.name, options.folder);
        var templatesBasePath = FileSystem.getFolderPath(config, options.name, 'templates');

        return [
            templatesBasePath + '/**/*.html',
            angularBasePath + '/**/*.html'
        ];
    };

}());
