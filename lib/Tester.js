require('sugar');

module.exports = (function() {

    var TaskContainer = require('./TaskContainer');
    var TaskRunner = require('./TaskRunner');

    var Tester = function(gulp) {
        this.gulp = gulp;
    };

    Tester.prototype.testTask = function(config) {
        TaskContainer.add(this.gulp, 'karma-lentil', TaskRunner.ingredients.karma(this.gulp, config, {
            action: 'watch'
        }));

        TaskContainer.add(this.gulp, 'karma-lentil-ci', TaskRunner.ingredients.karma(this.gulp, config, {
            singleRun: true
        }));
    };

    return Tester;

}());
