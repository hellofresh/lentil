require('sugar');

module.exports = (function() {

    var TaskContainer = require('./TaskContainer');

    var TaskRunner = function(gulp, task) {
        this.gulp = gulp;
        this.task = task;
    };

    TaskRunner.paths = {
        js: require('./paths/js'),
        sass: require('./paths/sass'),
        angularTemplates: require('./paths/angularTemplates'),
        angular: require('./paths/angular'),
        libs: require('./paths/libs'),
        karma: require('./paths/karma'),
        lint: require('./paths/lint')
    };

    TaskRunner.ingredients = {
        js: require('./ingredients/js'),
        sass: require('./ingredients/sass'),
        angularTemplates: require('./ingredients/angularTemplates'),
        angular: require('./ingredients/angular'),
        libs: require('./ingredients/libs'),
        watch: require('./ingredients/watch'),
        karma: require('./ingredients/karma'),
        deploy: require('./ingredients/deploy'),
        lint: require('./ingredients/lint')
    };

    TaskRunner.prototype.parse = function(config, options) {
        if (!(this.task in TaskRunner.ingredients)) {
            throw new Error('Task not available: ' + this.task);
        }

        var taskName = TaskContainer.generateTaskName(options.name, this.task);
        TaskContainer.add(this.gulp, taskName, TaskRunner.ingredients[this.task](this.gulp, config, options));

        this.addWatchToParseTask(taskName, config, options);
    };

    TaskRunner.prototype.addWatchToParseTask = function(parseTaskName, config, options) {
        var taskName = '{task}-watch'.assign({
            task: parseTaskName
        });

        if (this.task !== 'lint') {
            var files = TaskRunner.paths[this.task](config, options);
            if (this.task === 'angular') {
                files.push(TaskRunner.paths.angularTemplates(config, options));
                files = files.flatten();
            }
        } else {
            var files = Object.values(TaskRunner.paths[this.task](config, options)).flatten();
        }

        TaskContainer.add(this.gulp, taskName, TaskRunner.ingredients.watch(this.gulp, config, {
            tasks: [parseTaskName],
            files: files
        }), [parseTaskName]);
    };

    return TaskRunner;

}());
