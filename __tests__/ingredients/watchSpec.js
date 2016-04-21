describe('ingredients/watchSpec', function() {

    it('should return ingredient function', function() {
        var watch = require('../../lib/ingredients/watch');
        var Config = require('../../lib/Config');

        var config = new Config({});

        expect(watch(require('gulp'), config, {})).toEqual(jasmine.any(Function));
    });

});
