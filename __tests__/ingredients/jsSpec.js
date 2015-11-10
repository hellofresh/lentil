describe('ingredients/jsSpec', function() {

    it('should return ingredient function', function() {
        var TaskRunner = require('../../lib/TaskRunner');
        var js = require('../../lib/ingredients/js');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.paths, 'js').andReturn(['jsfiles']);

        var config = new Config({
            paths: {
                dist: __dirname
            }
        });

        expect(typeof js(config, {
            name: 'test'
        })()).toEqual('object');
        expect(TaskRunner.paths.js).toHaveBeenCalled();
    });

});
