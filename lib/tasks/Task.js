const FileSystem = require('../FileSystem');
const Logger = require('../Logger');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

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

        let filePath = `${distPath}/${moduleName}-${suffix}`;

        if (addMin) {
            filePath += '.min';
        }

        filePath += `.${fileExtension}`;

        return this.createDistFolder(path.dirname(filePath))
            .then(() => {
                return new Promise((resolve, reject) => {
                    fs.writeFile(filePath, contents, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            Logger.info(
                                `Wrote file to ${filePath} successfully.`
                            );

                            resolve(filePath);
                        }
                    });
                });
            });
    }

    createDistFolder(basePath) {
        return new Promise((resolve, reject) => {
            fs.access(basePath, fs.F_OK, (err) => {
                if (err) {
                    mkdirp(basePath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Task;
