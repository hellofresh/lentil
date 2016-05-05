module.exports = {
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist',
        templates: __dirname + '/templates',
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
        ESLint: {
            baseConfig: {
                extends: 'eslint:recommended'
            },
            globals: ['lentil', 'angular', 'window', 'document', 'CustomEvent']
        }
    }
};
