require('sugar');

module.exports = (function() {

    var path = require('path');
    var fs = require('fs');

    var FileSystem = {
        getDirectories: function(basePath) {
            return fs.readdirSync(basePath).filter(function(file) {
                return fs.statSync(path.join(basePath, file)).isDirectory();
            });
        },
        getModuleNames: function(config) {
            var modulesPath = config.get('paths.modules');

            return this.getDirectories(modulesPath);
        },
        getFolderPath: function(config, moduleName, folder) {
            return '{modulesPath}/{moduleName}/{folder}'.assign({
                modulesPath: config.get('paths.modules'),
                moduleName: moduleName,
                folder: folder
            });
        },
        hasFolder: function(config, moduleName, folder) {
            return fs.existsSync(this.getFolderPath(config, moduleName, folder));
        }
    };

    return FileSystem;

}());
