describe('ingredients/deploySpec', function() {

    it('should run deploy task', function(done) {
        var TaskRunner = require('../../lib/TaskRunner');
        var deploy = require('../../lib/ingredients/deploy');
        var Config = require('../../lib/Config');

        var config = new Config({
            paths: {
                dist: '../../tmp'
            }
        });

        deploy(config, {
            name: 'test'
        })(function() {
            expect(true).toBe(true);
            done();
        });
    });

});
