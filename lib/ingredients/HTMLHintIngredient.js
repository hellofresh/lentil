const Ingredient = require('./Ingredient');

class HTMLHintIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('HTMLHint'));
    }

    run(files) {
        return Promise.resolve(files);
    }
}

module.exports = HTMLHintIngredient;
