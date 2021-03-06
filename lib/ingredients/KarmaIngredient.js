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
        return new Promise((resolve, reject) => {
            const server = new Server({
                configFile: this.getConfigFile(),
                singleRun: true,
            }, (exitCode) => {
                Logger.debug('Karma finished');

                if (exitCode) {
                    reject();
                } else {
                    resolve();
                }
            });

            server.start();
        });
    }
}

module.exports = KarmaIngredient;
