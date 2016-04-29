const Ingredient = require('./Ingredient');
const UglifyJS = require('uglify-js');

class Uglify extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.specificOptions = Object.merge({
            single_quotes: true,
            remove: true,
            add: true
        }, this.getSpecificOptionsForIngredient('NgAnnotate'));
    }

    run(moduleName, contents) {
        return UglifyJS.minify(contents, {
            fromString: true
        }).code;
    }
}

module.exports = Uglify;
