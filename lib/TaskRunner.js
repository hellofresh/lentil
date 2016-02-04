require('sugar');

module.exports = (function() {

    var TaskContainer = require('./TaskContainer');

    var TaskRunner = function(task) {
        this.task = task;
    };

    TaskRunner.paths = {
        js: require('./paths/js'),
        sass: require('./paths/sass'),
        angularTemplates: require('./paths/angularTemplates'),
        angular: require('./paths/angular'),
        libs: require('./paths/libs'),
        karma: require('./paths/karma')
    };

    TaskRunner.ingredients = {
        js: require('./ingredients/js'),
        sass: require('./ingredients/sass'),
        angularTemplates: require('./ingredients/angularTemplates'),
        angular: require('./ingredients/angular'),
        libs: require('./ingredients/libs'),
        watch: require('./ingredients/watch'),
        karma: require('./ingredients/karma'),
        deploy: require('./ingredients/deploy')
    };

    TaskRunner.prototype.parse = function(config, options) {
        if (!(this.task in TaskRunner.ingredients)) {
            throw new Error('Task not available: ' + this.task);
        }

        var taskName = TaskContainer.generateTaskName(options.name, this.task);
        TaskContainer.add(taskName, TaskRunner.ingredients[this.task](config, options));

        this.addWatchToParseTask(taskName, config, options);
    };

    TaskRunner.prototype.addWatchToParseTask = function(parseTaskName, config, options) {
        var taskName = '{task}-watch'.assign({
            task: parseTaskName
        });

        TaskContainer.add(taskName, TaskRunner.ingredients.watch(config, {
            tasks: [parseTaskName],
            files: TaskRunner.paths[this.task](config, options)
        }), [parseTaskName]);
    };

    return TaskRunner;

}());
