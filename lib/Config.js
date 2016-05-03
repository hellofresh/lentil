class Config {
    constructor(config) {
        this.container = Object.assign({}, config);
    }

    get(key, defaultValue) {
        const pieces = key.split('.');

        let traceValue = Object.assign({}, this.container);
        for (let i = 0; i < pieces.length; i++) {
            traceValue = traceValue[pieces[i]];

            if (!traceValue) {
                return defaultValue;
            }
        }

        return traceValue;
    }

    mergeWithDefault(key, defaultValue) {
        return Object.merge(defaultValue || {}, this.get(key, {}), true);
    }
}

module.exports = Config;
