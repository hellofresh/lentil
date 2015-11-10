describe('paths/libsSpec', function() {

    it('should return paths', function() {
        var Config = require('../../lib/Config');
        var FileSystem = require('../../lib/FileSystem');

        spyOn(FileSystem, 'getFolderPath').andReturn('test');

        var config = new Config({});

        var libsPath = require('../../lib/paths/libs');
        expect(libsPath(config, {
            libs: ['aap']
        })[0]).toEqual('aap');
    });

});
