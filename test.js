const Lentil = require('.');

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
    plugins: {
        Karma: {
            configFile: __dirname + '/__test__/karma.conf.js'
        },
        eslint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
});

lentil.watchModuleTask('test', 'karma');

// lentil.runModuleTask('test', 'angular');
// lentil.runModuleTask('test', 'angular', {
//     shouldMinify: true
// });
//
// lentil.runModuleTask('test', 'js');
// lentil.runModuleTask('test', 'js', {
//     shouldMinify: true
// });
//
// lentil.runModuleTask('test', 'sass');
// lentil.runModuleTask('test', 'sass', {
//     shouldMinify: true
// });
//
// lentil.runModuleTask('', 'libs');
// lentil.runModuleTask('', 'libs', {
//     shouldMinify: true
// });
