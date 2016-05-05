module.exports = {
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist'
    },
    libs: {
        'test': [
            __dirname + '/libs/test.js'
        ]
    },
    ingredients: {
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
