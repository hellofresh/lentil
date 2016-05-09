const Ingredient = require('./Ingredient');
const sass = require('node-sass');
const Logger = require('../Logger');
const path = require('path');

class SASSIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            includePaths: [config.get('paths.libs')].flatten(),
            outputstyle: options.minify ? 'compressed' : 'expanded',
            sourceComments: !options.minify,
        }, this.getIngredientConfig('SASS'));
    }

    renderSASS(options = {}) {
        return new Promise((resolve, reject) => {
            const localOptions = options;
            localOptions.includePaths.unshift(path.dirname(localOptions.file));
            localOptions.includePaths = localOptions.includePaths.unique();
            localOptions.sourceMap = localOptions.file;

            Logger.debug('Running node-sass with the following options', localOptions);

            sass.render(localOptions, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    combineCss(result) {
        return result.map((sassOutput) => sassOutput.css.toString()).join('');
    }

    run(files) {
        return Promise.all(
            files.reverse().filter((file) =>
                !path.basename(file).startsWith('_')
            ).map((file) =>
                this.renderSASS(
                    Object.assign({ file }, this.ingredientConfig)
                )
            )
        ).then((result) => {
            Logger.debug('Node-sass result:', result);

            return this.combineCss(result);
        });
    }
}

module.exports = SASSIngredient;
