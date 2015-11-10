require('sugar');

module.exports = (function() {

    var TaskContainer = require('./TaskContainer');
    var TaskRunner = require('./TaskRunner');

    var Tester = function() {};

    Tester.prototype.testTask = function(config) {
        TaskContainer.add('karma-lentil', TaskRunner.ingredients.karma(config, {
            action: 'watch'
        }));
        TaskContainer.add('karma-lentil-ci', TaskRunner.ingredients.karma(config, {
            singleRun: true
        }));
    };

    return Tester;

}());
