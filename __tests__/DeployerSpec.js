describe('DeployerSpec', function() {

    it('should create deployer object', function() {
        var Deployer = require('../lib/Deployer');

        var deployer = new Deployer(['test']);

        expect(deployer.basicTasks).toEqual(['test']);
    });

    it('should add deploy task', function() {
        var Deployer = require('../lib/Deployer');
        var TaskContainer = require('../lib/TaskContainer');
        var TaskRunner = require('../lib/TaskRunner');

        spyOn(TaskContainer, 'add');

        var deployer = new Deployer(['test']);

        var config = {};
        deployer.deployTask(config);

        expect(TaskContainer.add).toHaveBeenCalledWith('deploy', jasmine.any(Function), ['test']);

        spyOn(TaskRunner.ingredients, 'deploy');
        deployer.deployTask(config);

        expect(TaskRunner.ingredients.deploy).toHaveBeenCalledWith(config);
    });

});
