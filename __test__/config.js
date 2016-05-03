module.exports = {
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
    karma: {
        configFile: __dirname + '/karma.conf.js'
    },
    plugins: {
        eslint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
};
