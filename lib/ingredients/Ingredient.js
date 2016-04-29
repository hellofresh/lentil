class Ingredient {
    constructor(config, options) {
        this.config = config;
        this.options = options;
    }

    getSpecificOptionsForIngredient(ingredientName) {
        return 'plugins' in this.options ?
            this.options.plugins[ingredientName] :
            {};
    }
}

module.exports = Ingredient;
