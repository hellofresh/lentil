describe('BundlerSpec', function() {

    it('should create bundler', function() {
        var Bundler = require('../lib/Bundler');

        var bundler = new Bundler(require('gulp'), []);

        expect(bundler.tasks).toEqual([]);
    });

    it('should bundle basic tasks', function() {
        var Bundler = require('../lib/Bundler');
        var TaskContainer = require('../lib/TaskContainer');
        spyOn(TaskContainer, 'add');

        var bundler = new Bundler(require('gulp'), [
            'test-watch',
            'test-js',
            'test2-js'
        ]);

        bundler.bundleBasicTasks(['js']);
        expect(TaskContainer.add).toHaveBeenCalledWith(require('gulp'), 'js', jasmine.any(Function), ['test-js', 'test2-js']);
        expect(TaskContainer.add).toHaveBeenCalledWith(require('gulp'), 'watch', jasmine.any(Function), ['test-watch']);
    });

    it('should bundle module tasks', function() {
        var Bundler = require('../lib/Bundler');
        var TaskContainer = require('../lib/TaskContainer');
        spyOn(TaskContainer, 'add');

        var bundler = new Bundler(require('gulp'), [
            'test-watch',
            'test-js',
            'test2-js',
            'test2-app'
        ]);

        spyOn(bundler, 'bundleBasicTasks');

        bundler.bundleModuleTasks(['js'], ['test', 'test2']);
        expect(TaskContainer.add).toHaveBeenCalledWith(require('gulp'), 'test-watch', jasmine.any(Function), ['test-watch']);
        expect(TaskContainer.add).toHaveBeenCalledWith(require('gulp'), 'test', jasmine.any(Function), ['test-js']);
        expect(TaskContainer.add).toHaveBeenCalledWith(require('gulp'), 'test2', jasmine.any(Function), ['test2-js', 'test2-app']);

        expect(bundler.bundleBasicTasks).toHaveBeenCalledWith(['js']);
    });

});
