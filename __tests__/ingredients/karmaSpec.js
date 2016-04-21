describe('ingredients/karmaSpec', function() {

    it('should run karma task', function() {
        var TaskRunner = require('../../lib/TaskRunner');
        var karma = require('../../lib/ingredients/karma');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.paths, 'karma').andReturn(['karmafiles']);

        var config = new Config({
            karma: {
                configFile: './package.json'
            }
        });

        expect(karma(require('gulp'), config, {
            singleRun: true,
            dryRun: true
        })).toEqual(jasmine.any(Function));
    });

});
