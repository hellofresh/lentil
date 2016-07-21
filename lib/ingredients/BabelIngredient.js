const Ingredient = require('./Ingredient');
const babel = require('babel-core');

class BabelIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('Babel'));
    }

    run(contents) {
        const result = babel.transform(contents, {
            presets: 'es2015',
        });

        if ('code' in result) {
            return result.code;
        }

        throw new Error('Babel returned a non-valid result.');
    }
}

module.exports = BabelIngredient;
