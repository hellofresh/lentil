describe('ingredients/sassSpec', function() {

    it('should return ingredient function', function() {
        var TaskRunner = require('../../lib/TaskRunner');
        var sass = require('../../lib/ingredients/sass');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.paths, 'sass').andReturn(['jsfiles']);

        var config = new Config({
            paths: {
                dist: __dirname
            }
        });

        expect(typeof sass(config, {
            name: 'test'
        })()).toEqual('object');
        expect(TaskRunner.paths.sass).toHaveBeenCalled();
    });

});
