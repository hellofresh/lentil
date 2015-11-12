require('sugar');

module.exports = (function() {

    var Config = function(config) {
        this.container = Object.clone(config);
    };

    Config.prototype.get = function(key, defaultValue)  {
        var pieces = key.split('.');

        var traceValue = Object.clone(this.container);
        for (var i = 0; i < pieces.length; i++) {
            traceValue = traceValue[pieces[i]];

            if (!traceValue) {
                return defaultValue;
            }
        }

        return traceValue;
    };

    Config.prototype.mergeDefault = function(key, defaultValue) {
        return Object.merge(defaultValue ? defaultValue : {}, this.get(key, {}), true);
    };

    return Config;

}());
