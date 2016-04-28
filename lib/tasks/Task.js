const FileSystem = require('../FileSystem');

class Task {
    constructor(config, moduleName, folder) {
        this.config = config;
        this.moduleName = moduleName;
        this.folder = folder;
    }

    getModuleFolderPath() {
        return FileSystem.getModuleFolderPath(this.config, this.moduleName);
    }

    run(options) {
        throw new Error('You shouldn\'t run the base task.');
    }
}

module.exports = Task;
