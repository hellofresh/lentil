const AngularTask = require('./AngularTask');
const JsTask = require('./JsTask');
const SassTask = require('./SassTask');

class TaskLoader {
    static fromTaskName(taskName, config, moduleName, folder) {
        switch (taskName) {
            case 'angular':
                return new AngularTask(config, moduleName, folder);
            case 'js':
                return new JsTask(config, moduleName, folder);
            case 'sass':
                return new SassTask(config, moduleName, folder);
        }
    }
}

module.exports = TaskLoader;
