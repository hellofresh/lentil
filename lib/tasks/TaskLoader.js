const AngularTask = require('./AngularTask');
const JsTask = require('./JsTask');
const SassTask = require('./SassTask');
const LibsTask = require('./LibsTask');
const KarmaTask = require('./KarmaTask');

class TaskLoader {
    static fromTaskName(taskName, config, moduleName) {
        switch (taskName) {
            case 'angular':
                return new AngularTask(config, moduleName);
            case 'js':
                return new JsTask(config, moduleName);
            case 'sass':
                return new SassTask(config, moduleName);
            case 'libs':
                return new LibsTask(config, moduleName);
            case 'karma':
                return new KarmaTask(config, moduleName);
        }
    }
}

module.exports = TaskLoader;
