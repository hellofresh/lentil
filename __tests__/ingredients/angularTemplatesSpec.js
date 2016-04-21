describe('ingredients/angularTemplatesSpec', function() {

    it('should return ingredient function', function(done) {
        var TaskRunner = require('../../lib/TaskRunner');
        var angularTemplates = require('../../lib/ingredients/angularTemplates');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.paths, 'angularTemplates').andReturn(['jsfiles']);

        var config = new Config({
            paths: {
                tmp: __dirname
            }
        });

        expect(typeof angularTemplates(require('gulp'), config, {
            name: 'test'
        })(function() {
            expect(true).toBe(true);
            done();
        })).toEqual('object');
        expect(TaskRunner.paths.angularTemplates).toHaveBeenCalled();
    });

});
