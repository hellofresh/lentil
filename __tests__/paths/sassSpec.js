describe('paths/sassSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');
        var FileSystem = require('../../lib/FileSystem');

        spyOn(FileSystem, 'getFolderPath').andReturn('test');

        var config = new Config({});

        var sassPath = require('../../lib/paths/sass');
        expect(sassPath(config, {})[0]).toEqual('test/**/*.{sass,scss}');
    });

});
