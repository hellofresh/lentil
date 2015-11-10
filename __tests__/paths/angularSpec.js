describe('paths/angularSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');
        var FileSystem = require('../../lib/FileSystem');

        spyOn(FileSystem, 'getFolderPath').andReturn('test');

        var config = new Config({});

        var angularPath = require('../../lib/paths/angular');
        expect(angularPath(config, {})[0]).toEqual('test/**/app.js');
    });

});
