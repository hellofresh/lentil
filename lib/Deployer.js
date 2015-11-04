module.exports = (function() {

    var TaskContainer = require('./TaskContainer');

    var Deployer = function(basicTasks) {
        this.basicTasks = basicTasks;
    };

    Deployer.prototype.deployTask = function(config) {
        TaskContainer.add('deploy', TaskRunner.ingredients.deploy(config), this.basicTasks);
    };

    return Deployer;

}());
