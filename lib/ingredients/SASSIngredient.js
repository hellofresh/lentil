const Ingredient = require('./Ingredient');
const sass = require('node-sass');
const fs = require('fs');
const Logger = require('../Logger');

class SASSIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            includePaths: [config.get('paths.libs')].flatten(),
            outputstyle: options.shouldMinify ? 'compressed' : 'nested',
            sourceComments: !options.shouldMinify
        }, this.getIngredientConfig('SASS'));
    }

    renderSASS(options = {}) {
        return new Promise((resolve, reject) => {
            Logger.debug('Running node-sass with the following options', options);

            sass.render(options, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    combineCss(result) {
        return result.map((sassOutput) => {
            return sassOutput.css.toString();
        }).join('');
    }

    run(files) {
        return Promise.all(files.map((file) => {
            return this.renderSASS(Object.assign({
                file: file
            }, this.ingredientConfig));
        })).then((result) => {
            Logger.debug('Node-sass result:', result);

            return this.combineCss(result);
        });
    }
}

module.exports = SASS;
