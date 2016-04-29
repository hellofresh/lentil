const AngularTask = require('./AngularTask');
const JsTask = require('./JsTask');
const SassTask = require('./SassTask');

class TaskLoader {
    static fromTaskName(taskName, config, moduleName) {
        switch (taskName) {
            case 'angular':
                return new AngularTask(config, moduleName);
            case 'js':
                return new JsTask(config, moduleName);
            case 'sass':
                return new SassTask(config, moduleName);
        }
    }
}

module.exports = TaskLoader;
