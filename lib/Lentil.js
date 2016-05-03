const Config = require('./Config');
const Logger = require('./Logger');
const TaskLoader = require('./tasks/TaskLoader');
const gaze = require('gaze');

class Lentil {
    constructor(config) {
        this.config = new Config(Object.merge({
            paths: {
                templates: __dirname + '/../templates'
            }
        }, config, true));
    }

    watchModuleTask(moduleName, taskName = '', options = {}) {
        Logger.debug(`Watching task: ${taskName} on module: ${moduleName}`, options);

        const task = TaskLoader.fromTaskName(taskName, this.config, moduleName);

        task.run(options);

        gaze(task.getRelevantFiles(), (err, watcher) => {
            watcher.on('all', (event, filePath) => {
                Logger.debug(`Detected change to ${filePath}`);

                task.run(options);
            });
        });
    }

    runModuleTask(moduleName = '', taskName = '', options = {}) {
        Logger.debug(`Running task: ${taskName} on module: ${moduleName}`, options);

        const task = TaskLoader.fromTaskName(taskName, this.config, moduleName);

        task.run(options);
    }
}

module.exports = Lentil;
