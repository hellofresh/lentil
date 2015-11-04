module.exports = (function() {

    var TaskContainer = require('./TaskContainer');

    var Bundler = function(tasks) {
        this.tasks = tasks;
    };

    Bundler.prototype.bundleBasicTasks = function(basicTasks) {
        for (var i = 0; i < basicTasks.length; i++) {
            var basicTask = basicTasks[i];

            TaskContainer.add(basicTask, function() {}, this.tasks.filter(function(task) {
                return task.endsWith(basicTask);
            }));
        }

        TaskContainer.add('watch', function() {}, this.tasks.filter(function(task) {
            return task.endsWith('watch');
        }));
    };

    Bundler.prototype.bundleModuleTasks = function(basicTasks, moduleNames) {
        for (var i = 0; i < moduleNames.length; i++) {
            var moduleName = moduleNames[i];

            TaskContainer.add('{moduleName}-watch'.assign({
                moduleName: moduleName
            }), function() {}, this.tasks.filter(function(task) {
                return task.startsWith(moduleName) && task.endsWith('watch');
            }));

            TaskContainer.add(moduleName, function() {}, this.tasks.filter(function(task) {
                return task.startsWith(moduleName) && !task.endsWith('watch');
            }));
        }

        this.bundleBasicTasks(basicTasks);
    };

    return Bundler;

}());
