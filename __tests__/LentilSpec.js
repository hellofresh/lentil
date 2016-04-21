describe('LentilSpec', function() {

    it('should create object', function() {
        var Config = require('../lib/Config');
        var Lentil = require('../lib/Lentil');
        var FileSystem = require('../lib/FileSystem');

        spyOn(FileSystem, 'getModuleNames');

        var config = new Config({});
        var gulp = require('gulp');
        var lentil = new Lentil(gulp, {});

        expect(lentil.config).toEqual(config);
        expect(FileSystem.getModuleNames).toHaveBeenCalledWith(config);
    });

    it('should parse module', function() {
        var Lentil = require('../lib/Lentil');
        var FileSystem = require('../lib/FileSystem');

        spyOn(FileSystem, 'hasFolder').andReturn(true);

        var configObject = {
            paths: {
                modules: __dirname
            },
            tasks: {
                'app': 'angular'
            }
        };

        var gulp = require('gulp');
        var lentil = new Lentil(gulp, configObject);

        expect(lentil.parseModule('test')).toBeUndefined();
    });

    it('should parse libs', function() {
        var Lentil = require('../lib/Lentil');

        var configObject = {
            paths: {
                modules: __dirname
            },
            libs: {
                'test': []
            }
        };

        var gulp = require('gulp');
        var lentil = new Lentil(gulp, configObject);

        expect(lentil.parseLibs()).toBeUndefined();
    });

    it('should start', function() {
        var Lentil = require('../lib/Lentil');
        var FileSystem = require('../lib/FileSystem');

        spyOn(FileSystem, 'getModuleNames').andReturn(['test']);

        var configObject = {
            paths: {
                modules: __dirname
            },
            libs: {
                'test': []
            },
            tasks: {
                'app': 'angular'
            }
        };

        var gulp = require('gulp');
        var lentil = new Lentil(gulp, configObject);

        spyOn(lentil, 'parseModule');
        spyOn(lentil, 'parseLibs');

        lentil.start();

        expect(lentil.parseModule).toHaveBeenCalledWith('test');
        expect(lentil.parseLibs).toHaveBeenCalled();
    });

});
