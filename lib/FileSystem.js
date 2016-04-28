const path = require('path');
const fs = require('fs');

var FileSystem = {
    getDirectories: (basePath) => {
        return fs.readdirSync(basePath).filter((file) => {
            return fs.statSync(path.join(basePath, file)).isDirectory();
        });
    },
    getModuleNames: (config) => {
        var modulesPath = config.get('paths.modules');

        return FileSystem.getDirectories(modulesPath);
    },
    getModuleFolderPath: (config, moduleName) => {
        var modulesPath = config.get('paths.modules');
        return `${modulesPath}/${moduleName}/${folder}`;
    },
    getFolderPath: (config, moduleName, folder) => {
        var modulesPath = config.get('paths.modules');
        return `${modulesPath}/${moduleName}/${folder}`;
    },
    hasFolder: (config, moduleName, folder) => {
        return fs.existsSync(FileSystem.getFolderPath(config, moduleName, folder));
    }
};

module.exports = FileSystem;
