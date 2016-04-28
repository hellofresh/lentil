class TaskContainer {
    constructor(tasks) {
        this.container = tasks || {};
    }

    add(taskName, task) {
        this.container[taskName] = task;
    }

    run(taskName, options) {
        if (!task in this.container) {
            throw new Error(`${task} is not defined in the container.`);
        }

        var task = this.container[taskName];

        task.run(options);
    }
}

module.exports = TaskContainer;
