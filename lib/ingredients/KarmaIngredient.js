const Ingredient = require('./Ingredient');
const Server = require('karma').Server;
const Logger = require('../Logger');

class KarmaIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('Karma'));
    }

    getConfigFile() {
        return this.ingredientConfig.configFile;
    }

    run() {
        return new Promise((resolve) => {
            const server = new Server({
                configFile: this.getConfigFile(),
                singleRun: true,
            }, () => {
                Logger.debug('Karma finished');

                resolve();
            });

            server.start();
        });
    }
}

module.exports = KarmaIngredient;
