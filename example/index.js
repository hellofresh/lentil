const Lentil = require('..');

const lentil = new Lentil({
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist',
        rootPrefix: '/'
    },
    libs: {
        'test': [
            __dirname + '/libs/test.js'
        ]
    },
    plugins: {
        Babel: {},
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

const testModuleTasks = ['angular', 'js', 'sass'];

for (let task of testModuleTasks) {
    lentil.run('test', task);
    lentil.run('test', task, {
        shouldMinify: true
    });
}

lentil.run('es6', 'js', { babel: true });

lentil.run('', 'libs');
lentil.run('', 'libs', {
    shouldMinify: true
});

lentil.run('test', 'karma');
