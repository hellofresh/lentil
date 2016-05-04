const Lentil = require('..');

const lentil = new Lentil({
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist',
        tmp: __dirname + '/tmp',
        rootPrefix: '/'
    },
    libs: {
        'test': [
            __dirname + '/libs/test.js'
        ]
    },
    plugins: {
        Karma: {
            configFile: __dirname + '/karma.conf.js'
        },
        eslint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
});

lentil.run('test', 'karma');

// lentil.run('test', 'angular');
// lentil.run('test', 'angular', {
//     shouldMinify: true
// });
//
// lentil.run('test', 'js');
// lentil.run('test', 'js', {
//     shouldMinify: true
// });
//
// lentil.run('test', 'sass');
// lentil.run('test', 'sass', {
//     shouldMinify: true
// });
//
// lentil.run('', 'libs');
// lentil.run('', 'libs', {
//     shouldMinify: true
// });
