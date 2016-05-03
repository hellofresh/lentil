const path = require('path');
const fs = require('fs');

module.exports = {
    getDirectories: (basePath) => {
        return fs.readdirSync(basePath).filter((file) => {
            return fs.statSync(path.join(basePath, file)).isDirectory();
        });
    },
    getModuleNames: (config) => {
        const modulesPath = config.get('paths.modules');

        return FileSystem.getDirectories(modulesPath);
    },
    getModuleFolderPath: (config, moduleName) => {
        const modulesPath = config.get('paths.modules');
        return `${modulesPath}/${moduleName}`;
    },
    getFolderPath: (config, moduleName, folder) => {
        const modulesPath = config.get('paths.modules');
        return `${modulesPath}/${moduleName}/${folder}`;
    },
    hasFolder: (config, moduleName, folder) => {
        return fs.existsSync(FileSystem.getFolderPath(config, moduleName, folder));
    }
};
