const Config = require('./Config');
const FileSystem = require('./FileSystem');
const Logger = require('./Logger');
const TaskContainer = require('./TaskContainer');
const TaskLoader = require('./tasks/TaskLoader');

class Lentil {
    constructor(config) {
        this.config = new Config(config);
        this.taskContainer = new TaskContainer();


    }

    parseModule(moduleName) {
        Logger.debug(`Parsing module: ${moduleName}`);

        var tasks = this.config.get('tasks');

        for (var folder in tasks) {
            let taskName = tasks[folder];

            Logger.debug(`Parsing: ${folder}, for task: ${taskName}`);

            if (FileSystem.hasFolder(this.config, moduleName, folder)) {
                Logger.debug(`${moduleName} has ${taskName}:${folder}`);

                this.taskContainer.add(taskName, TaskLoader.fromTaskName(taskName, this.config, moduleName, folder));
            }
        }
    }

    start() {
        var moduleNames = FileSystem.getModuleNames(this.config);

        for (let moduleName of moduleNames) {
            this.parseModule(moduleName);
        }

        this.taskContainer.run('angular', {});
    }
}

module.exports = Lentil;
