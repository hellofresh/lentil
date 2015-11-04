var Lentil = require('../lib/Lentil');

var lentil = new Lentil({
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist',
        tmp: __dirname + '/tmp'
    },
    tasks: {
        'js': 'js',
        'app': 'angular',
        'sass': 'sass'
    },
    libs: {}
});

lentil.start();
