module.exports = (function() {

    var FileSystem = require('../FileSystem');

    return function(config, options) {
        var taskBasePath = FileSystem.getFolderPath(config, options.name, options.folder);

        return [
            taskBasePath + '/**/app.js',
            taskBasePath + '/**/*.js',
            '!' + taskBasePath + '/**/*{Spec,spec}.js'
        ];
    };

}());
