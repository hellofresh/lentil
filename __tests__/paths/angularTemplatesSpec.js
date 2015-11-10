describe('paths/angularTemplatesSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');
        var FileSystem = require('../../lib/FileSystem');

        spyOn(FileSystem, 'getFolderPath').andReturn('test');

        var config = new Config({});

        var angularTemplatesPath = require('../../lib/paths/angularTemplates');
        expect(angularTemplatesPath(config, {})[0]).toEqual('test/**/*.html');
    });

});
