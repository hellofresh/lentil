require('sugar');

module.exports = (function() {

    var TaskContainer = require('./TaskContainer');
    var TaskRunner = require('./TaskRunner');

    var Deployer = function(gulp, basicTasks) {
        this.gulp = gulp;
        this.basicTasks = basicTasks;
    };

    Deployer.prototype.deployTask = function(config) {
        TaskContainer.add(this.gulp, 'deploy', TaskRunner.ingredients.deploy(this.gulp, config), this.basicTasks);
    };

    return Deployer;

}());
