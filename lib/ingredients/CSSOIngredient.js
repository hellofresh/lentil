const Ingredient = require('./Ingredient');
const csso = require('csso');

class CSSOIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('CSSO'));
    }

    run(css) {
        const compressed = csso.minify(css);

        return Promise.resolve(compressed.css);
    }
}

module.exports = CSSOIngredient;
