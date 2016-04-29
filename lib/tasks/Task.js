const FileSystem = require('../FileSystem');
const Logger = require('../Logger');

class Task {
    constructor(config, moduleName) {
        this.config = config;
        this.moduleName = moduleName;
    }

    getModuleFolderPath() {
        return FileSystem.getModuleFolderPath(this.config, this.moduleName);
    }

    run(options) {
        Logger.error('You shouldn\'t run the base task.');
    }
}

module.exports = Task;
