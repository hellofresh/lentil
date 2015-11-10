describe('paths/karmaSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');

        var config = new Config({
            karma: {
                files: [
                    'testfile',
                    'testfile2'
                ]
            }
        });

        var karmaPath = require('../../lib/paths/karma');
        expect(karmaPath(config)[0]).toEqual('testfile');
    });

});
