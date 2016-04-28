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

    Deployer.prototype.quickDeployTask = function() {
        TaskContainer.add(this.gulp, 'quick-deploy', function(done) {
            global.quickDeploy = true;
            this.gulp.start('deploy')
                .on('end', function() {
                    global.quickDeploy = false;
                    done();
                });
        }.bind({
            gulp: this.gulp
        }));
    };

    return Deployer;

}());
