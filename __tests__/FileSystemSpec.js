describe('FileSystemSpec', function() {

    it('should get directories', function() {
        var FileSystem = require('../lib/FileSystem');
        var fs = require('fs');

        spyOn(fs, 'readdirSync').andReturn(['tmp']);
        spyOn(fs, 'statSync').andReturn({
            isDirectory: function() {
                return true;
            }
        });

        expect(FileSystem.getDirectories(__dirname)).toEqual(['tmp']);
        expect(fs.readdirSync).toHaveBeenCalledWith(__dirname);
        expect(fs.statSync).toHaveBeenCalledWith(__dirname + '/tmp');
    });

    it('should get module names', function() {
        var FileSystem = require('../lib/FileSystem');

        spyOn(FileSystem, 'getDirectories').andReturn(['tmp']);

        expect(FileSystem.getModuleNames({
            get: function() {
                return __dirname;
            }
        })).toEqual(['tmp']);
        expect(FileSystem.getDirectories).toHaveBeenCalledWith(__dirname);
    });

    it('should get folder path', function() {
        var FileSystem = require('../lib/FileSystem');

        expect(FileSystem.getFolderPath({
            get: function() {
                return __dirname;
            }
        }, 'testModule', 'test')).toEqual(__dirname + '/testModule/test');
    });

    it('should check if has folder', function() {
        var FileSystem = require('../lib/FileSystem');
        var fs = require('fs');

        spyOn(fs, 'existsSync').andReturn(true);
        spyOn(FileSystem, 'getFolderPath').andReturn(__dirname);

        expect(FileSystem.hasFolder({}, 'test', 'test')).toBe(true);
    });

});
