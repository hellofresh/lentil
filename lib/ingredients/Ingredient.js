class Ingredient {
    constructor(config, options) {
        this.config = config;
        this.options = options;
    }

    getIngredientConfig(ingredientName) {
        return this.config.get(`plugins.${ingredientName}`);
    }
}

module.exports = Ingredient;
