require('sugar');
require('promise.prototype.finally');

const Lentil = require('./lib/Lentil');

const lentil = new Lentil({
    paths: {
        modules: __dirname + '/__test__/modules',
        libs: __dirname + '/__test__/libs',
        dist: __dirname + '/__test__/dist',
        tmp: __dirname + '/__test__/tmp',
        rootPrefix: '/'
    },
    libs: {
        'test': [
            __dirname + '/__test__/libs/test.js'
        ]
    },
    karma: {
        configFile: __dirname + '/karma.conf.js',
    },
    plugins: {
        Uglify: {
            test: true
        },
        eslint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
});

// lentil.runModuleTask('test', 'angular', {
//     shouldMinify: true
// });
// lentil.runModuleTask('test', 'js');
// lentil.runModuleTask('test', 'sass', {
//     shouldMinify: true
// });

lentil.runLibsTask('test', {
    shouldMinify: true
});

module.exports = Lentil;
