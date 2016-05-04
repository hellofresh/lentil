const Config = require('./Config');
const Logger = require('./Logger');
const TaskLoader = require('./tasks/TaskLoader');
const gaze = require('gaze');
const cluster = require('cluster');

class Lentil {
    constructor(config) {
        this.config = new Config(Object.merge({
            paths: {
                templates: __dirname + '/../templates'
            }
        }, config, true));
    }

    watch(moduleName, taskName = '', options = {}) {
        Logger.info(`Watching task: ${taskName} on module: ${moduleName}`, options);

        const task = TaskLoader.fromTaskName(taskName, this.config, moduleName);

        options.watch = true;

        gaze(task.getRelevantFiles(), (err, watcher) => {
            watcher.on('all', (event, filePath) => {
                Logger.info(`Detected change to ${filePath}`);

                task.run(options);
            });
        });

        return task.run(options);
    }

    run(moduleName = '', taskName = '', options = {}) {
        Logger.info(`Running task: ${taskName} on module: ${moduleName}`, options);

        const task = TaskLoader.fromTaskName(taskName, this.config, moduleName);

        return task.run(options);
    }
}

module.exports = Lentil;
