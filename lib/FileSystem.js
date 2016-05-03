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
    },
    concat: (files) => {
        return Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(file, (err, contents) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(contents.toString());
                        }
                    });
                });
            })
        ).then((contents) => {
            return contents.join('');
        });
    }
};
