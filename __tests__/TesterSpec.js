describe('TesterSpec', function() {

    it('should create tester object', function() {
        var Tester = require('../lib/Tester');

        var tester = new Tester();
        expect(tester).toEqual(new Tester());
    });

    it('should add test tasks', function() {
        var Tester = require('../lib/Tester');
        var TaskContainer = require('../lib/TaskContainer');
        var TaskRunner = require('../lib/TaskRunner');

        spyOn(TaskContainer, 'add');
        spyOn(TaskRunner.ingredients, 'karma');

        var tester = new Tester();

        tester.testTask({});
        expect(TaskContainer.add).toHaveBeenCalledWith('karma-lentil', undefined);
        expect(TaskContainer.add).toHaveBeenCalledWith('karma-lentil-ci', undefined);
        expect(TaskRunner.ingredients.karma).toHaveBeenCalledWith({}, {
            action: 'watch'
        });
        expect(TaskRunner.ingredients.karma).toHaveBeenCalledWith({}, {
            singleRun: true
        });
    });

});
