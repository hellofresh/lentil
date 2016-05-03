const Ingredient = require('./Ingredient');
const UglifyJS = require('uglify-js');

class Uglify extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            warnings: true,
            fromString: true,
            output: {
                space_colon: false,
                screw_ie8: true
            }
        }, this.getIngredientConfig('Uglify'));
    }

    run(moduleName, contents) {
        const result = UglifyJS.minify(contents, this.ingredientConfig);

        if ('code' in result) {
            return result.code;
        } else {
            throw new Error('UglifyJS returned a non-valid result.');
        }
    }
}

module.exports = Uglify;
