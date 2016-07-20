const AngularTask = require('./AngularTask');
const BabelTask = require('./BabelTask');
const JsTask = require('./JsTask');
const SassTask = require('./SassTask');
const LibsTask = require('./LibsTask');
const KarmaTask = require('./KarmaTask');
const LintTask = require('./LintTask');

class TaskLoader {
    static fromTaskName(taskName, config, moduleName) {
        switch (taskName) {
            case 'angular':
            case 'js':
            case 'sass':
                if (!moduleName) {
                    const err = new Error('Module name is undefined.');

                    throw err;
                }

                break;
            default:
                break;
        }

        switch (taskName) {
            case 'angular':
                return new AngularTask(config, moduleName);
            case 'babel':
                return new BabelTask(config, moduleName);
            case 'js':
                return new JsTask(config, moduleName);
            case 'sass':
                return new SassTask(config, moduleName);
            case 'libs':
                return new LibsTask(config, moduleName);
            case 'karma':
                return new KarmaTask(config, moduleName);
            case 'lint':
                return new LintTask(config, moduleName);
            default:
                break;
        }

        return null;
    }
}

module.exports = TaskLoader;
