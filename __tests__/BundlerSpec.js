describe('BundlerSpec', function() {

    it('should create bundler', function() {
        var Bundler = require('../lib/Bundler');

        var bundler = new Bundler([]);

        expect(bundler.tasks).toEqual([]);
    });

    it('should bundle basic tasks', function() {
        var Bundler = require('../lib/Bundler');
        var TaskContainer = require('../lib/TaskContainer');
        spyOn(TaskContainer, 'add');

        var bundler = new Bundler([
            'test-watch',
            'test-js',
            'test2-js'
        ]);

        bundler.bundleBasicTasks(['js']);
        expect(TaskContainer.add).toHaveBeenCalledWith('js', jasmine.any(Function), ['test-js', 'test2-js']);
        expect(TaskContainer.add).toHaveBeenCalledWith('watch', jasmine.any(Function), ['test-watch']);
    });

    it('should bundle module tasks', function() {
        var Bundler = require('../lib/Bundler');
        var TaskContainer = require('../lib/TaskContainer');
        spyOn(TaskContainer, 'add');

        var bundler = new Bundler([
            'test-watch',
            'test-js',
            'test2-js',
            'test2-app'
        ]);

        spyOn(bundler, 'bundleBasicTasks');

        bundler.bundleModuleTasks(['js'], ['test', 'test2']);
        expect(TaskContainer.add).toHaveBeenCalledWith('test-watch', jasmine.any(Function), ['test-watch']);
        expect(TaskContainer.add).toHaveBeenCalledWith('test', jasmine.any(Function), ['test-js']);
        expect(TaskContainer.add).toHaveBeenCalledWith('test2', jasmine.any(Function), ['test2-js', 'test2-app']);

        expect(bundler.bundleBasicTasks).toHaveBeenCalledWith(['js']);
    });

});
