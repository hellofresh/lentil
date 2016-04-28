require('sugar');

const Lentil = require('./lib/Lentil');

var lentil = new Lentil({
    paths: {
        modules: __dirname + '/__test__/modules',
        libs: __dirname + '/__test__/libs',
        dist: __dirname + '/__test__/dist',
        tmp: __dirname + '/__test__/tmp',
        rootPrefix: '/'
    },
    tasks: {
        'js': 'js',
        'app': 'angular',
        'sass': 'sass'
    },
    libs: {},
    karma: {
        configFile: __dirname + '/karma.conf.js',
    },
    plugins: {
        eslint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
});

console.log(lentil);

lentil.start();

module.exports = Lentil;
