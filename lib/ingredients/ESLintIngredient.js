const Ingredient = require('./Ingredient');

class ESLintIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('ESLint'));
    }
}

module.exports = ESLintIngredient;
