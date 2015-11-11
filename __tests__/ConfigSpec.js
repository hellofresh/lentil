describe('ConfigSpec', function() {

    it('should create config object', function() {
        var Config = require('../lib/Config');

        var testObject = {
            test: 'test'
        };

        var config = new Config(testObject);

        expect(config.container.test).toEqual('test');
    });

    it('should get the key', function() {
        var Config = require('../lib/Config');

        var testObject = {
            test: {
                testdeep: {
                    verydeep: {
                        somewhere: {
                            findthis: 'test'
                        }
                    }
                }
            }
        };

        var config = new Config(testObject);

        expect(config.get('test.testdeep.verydeep.somewhere.findthis')).toEqual('test');
    });

    it('should return default value', function() {
        var Config = require('../lib/Config');

        var testObject = {};

        var config = new Config(testObject);

        expect(config.get('nothere', 'test')).toEqual('test');
    });

    it('should return the default value from catch', function() {
        var Config = require('../lib/Config');

        var testObject = {};

        var config = new Config(testObject);

        expect(config.get('nothere.nothere', 'test')).toEqual('test');
    });

    it('should merge default config', function() {
        var Config = require('../lib/Config');

        var config = new Config({
            test: {
                a: 'b'
            }
        });

        var merged = config.mergeDefault('test', {
            a: 'c'
        });

        expect(merged.a).toEqual('b');

        var config = new Config({
            test: {}
        });

        var merged = config.mergeDefault('test', {
            a: 'c'
        });

        expect(merged.a).toEqual('c');
    });

});
