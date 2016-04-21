describe('ingredients/libsSpec', function() {

    it('should return ingredient function', function() {
        var TaskRunner = require('../../lib/TaskRunner');
        var libs = require('../../lib/ingredients/libs');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.paths, 'libs').andReturn(['jsfiles']);

        var config = new Config({
            paths: {
                dist: __dirname
            }
        });

        expect(typeof libs(require('gulp'), config, {
            name: 'test'
        })()).toEqual('object');
        expect(TaskRunner.paths.libs).toHaveBeenCalled();
    });

});
