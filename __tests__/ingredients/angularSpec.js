describe('ingredients/angularSpec', function() {

    it('should return ingredient function', function() {
        var TaskRunner = require('../../lib/TaskRunner');
        var angular = require('../../lib/ingredients/angular');
        var Config = require('../../lib/Config');

        spyOn(TaskRunner.ingredients, 'angularTemplates').andReturn(function() {
            return {
                then: function(cb) {
                    return cb('templateFile');
                }
            }
        });
        spyOn(TaskRunner.paths, 'angular').andReturn(['jsfiles']);

        var config = new Config({
            paths: {
                dist: __dirname
            }
        });

        expect(typeof angular(require('gulp'), config, {
            name: 'test'
        })()).toEqual('object');
        expect(TaskRunner.paths.angular).toHaveBeenCalled();
        expect(TaskRunner.ingredients.angularTemplates).toHaveBeenCalled();
    });

});
