const Ingredient = require('./Ingredient');
const uglify = require('uglify-js');

class UglifyIngredient extends Ingredient {
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

    run(contents) {
        const result = uglify.minify(contents, this.ingredientConfig);

        if ('code' in result) {
            return result.code;
        } else {
            throw new Error('uglify returned a non-valid result.');
        }
    }
}

module.exports = UglifyIngredient;
