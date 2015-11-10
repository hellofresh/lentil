describe('paths/jsSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');
        var FileSystem = require('../../lib/FileSystem');

        spyOn(FileSystem, 'getFolderPath').andReturn('test');

        var config = new Config({});

        var jsPath = require('../../lib/paths/js');
        expect(jsPath(config, {})[0]).toEqual('test/**/*.js');
    });

});
