describe('TaskContainerSpec', function() {

    it('should add a task', function() {
        var TaskContainer = require('../lib/TaskContainer');

        TaskContainer.add('test123');

        expect(TaskContainer.container.test123).not.toBeUndefined();
    });

    it('should throw an error on existing task', function() {
        var TaskContainer = require('../lib/TaskContainer');

        expect(function() {
            TaskContainer.add('test123');
        }).toThrow(new Error('test123 is already present in the TaskContainer.'));
    });

    it('should generate a task name', function() {
        var TaskContainer = require('../lib/TaskContainer');

        expect(TaskContainer.generateTaskName('test', 'test')).toEqual('test-test');
    });

    it('should get task names', function() {
        var TaskContainer = require('../lib/TaskContainer');

        expect(TaskContainer.getTaskNames()).toEqual(jasmine.any(Array));
    });

});
