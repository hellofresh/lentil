describe('TaskRunnerSpec', function() {

    it('should initialize object', function() {
        var TaskRunner = require('../lib/TaskRunner');

        var taskRunner = new TaskRunner('watch');

        expect(taskRunner.task).toEqual('watch');
    });

    it('should parse task', function() {
        var TaskContainer = require('../lib/TaskContainer');
        var TaskRunner = require('../lib/TaskRunner');

        var taskRunner = new TaskRunner('watch');

        spyOn(taskRunner, 'addWatchToParseTask');
        spyOn(TaskContainer, 'add');

        taskRunner.parse({}, {});
        expect(TaskContainer.add).toHaveBeenCalledWith('undefined-watch', jasmine.any(Function));
    });

    it('should fail to parse task', function() {
        var TaskContainer = require('../lib/TaskContainer');
        var TaskRunner = require('../lib/TaskRunner');

        var taskRunner = new TaskRunner('nothing');

        spyOn(taskRunner, 'addWatchToParseTask');
        spyOn(TaskContainer, 'add');

        expect(function() {
            taskRunner.parse({}, {})
        }).toThrow(new Error('Task not available: nothing'));
    });

    it('should add watch to parse task', function() {
        var TaskContainer = require('../lib/TaskContainer');
        var TaskRunner = require('../lib/TaskRunner');

        spyOn(TaskContainer, 'add');
        spyOn(TaskRunner.paths, 'js').andReturn(jasmine.any(Function));

        var taskRunner = new TaskRunner('js');
        taskRunner.addWatchToParseTask('whatever', {}, {});

        expect(TaskRunner.paths.js).toHaveBeenCalledWith({}, {});
        expect(TaskContainer.add).toHaveBeenCalledWith('whatever-watch', jasmine.any(Function), ['whatever']);
    });

});
