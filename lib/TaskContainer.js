require('sugar');

module.exports = (function() {

    var TaskContainer = {
        container: {},
        add: function(gulp, name, task, deps) {
            if (name in this.container) {
                throw new Error('{name} is already present in the TaskContainer.'.assign({
                    name: name
                }));
            }

            if (!deps) {
                deps = [];
            }

            this.container[name] = gulp.task(name, deps, task);
        },
        generateTaskName: function(moduleName, task) {
            return '{moduleName}-{task}'.assign({
                moduleName: moduleName,
                task: task
            });
        },
        getTaskNames: function() {
            return Object.keys(this.container);
        }
    };

    return TaskContainer;

}());
