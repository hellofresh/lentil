module.exports = (function() {

    var Config = function(config) {
        this.container = Object.clone(config);
    };

    Config.prototype.get = function(key)  {
        var pieces = key.split('.');

        var returnValue = Object.clone(this.container);
        for (var i = 0; i < pieces.length; i++) {
            returnValue = returnValue[pieces[i]];
        }

        return returnValue;
    };

    return Config;

}());
