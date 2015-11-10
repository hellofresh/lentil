require('sugar');

module.exports = (function() {

    var Config = function(config) {
        this.container = Object.clone(config);
    };

    Config.prototype.get = function(key, defaultValue)  {
        var pieces = key.split('.');

        var traceValue = Object.clone(this.container);
        for (var i = 0; i < pieces.length; i++) {
            try {
                traceValue = traceValue[pieces[i]];

                if (!traceValue) {
                    return defaultValue;
                }
            } catch (e) {
                return defaultValue;
            }
        }

        return traceValue;
    };

    return Config;

}());
