const FileSystem = require('../FileSystem');
const Logger = require('../Logger');
const fs = require('fs');

class Task {
    constructor(config, moduleName) {
        this.config = config;
        this.moduleName = moduleName;
    }

    getModuleFolderPath() {
        return FileSystem.getModuleFolderPath(this.config, this.moduleName);
    }

    run() {
        const err = new Error('You shouldn\'t run the base task.');

        Logger.error(err);
    }

    getRelevantFiles() {
        return [];
    }

    makeGlobArray(globArray) {
        const moduleFolderPath = this.getModuleFolderPath();

        return globArray.map((path) => {
            if (path.startsWith('!')) {
                return `!${moduleFolderPath}${path.substring(1)}`;
            }

            return `${moduleFolderPath}${path}`;
        });
    }

    writeDistFile(moduleName, suffix, fileExtension, contents, addMin = false) {
        const distPath = this.config.get('paths.dist');

        let path = `${distPath}/${moduleName}-${suffix}`;

        if (addMin) {
            path += '.min';
        }

        path += `.${fileExtension}`;

        return new Promise((resolve, reject) => {
            fs.writeFile(path, contents, (err) => {
                if (err) {
                    reject(err);
                } else {
                    Logger.info(`Wrote file to ${path} successfully.`);

                    resolve(path);
                }
            });
        });
    }
}

module.exports = Task;
