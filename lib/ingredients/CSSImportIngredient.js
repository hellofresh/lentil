const Ingredient = require('./Ingredient');
const Logger = require('../Logger');
const rework = require('rework');
const reworkImporter = require('rework-importer');
const fs = require('fs');
const path = require('path');

class SASSIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('CSSImport'));
    }

    getFileContents(file) {
        return new Promise((resolve, reject) => {
            fs.readFile((err, contents) {
                if (err) {
                    reject(err);
                } else {
                    resolve(contents.toString());
                }
            });
        });
    }

    rework(file, contents) {
        const processed = rework(contents, 'utf-8')
            .use(reworkImporter({
                file: file,
                base: path.dirname(file)
            })
            .use(rework.url((url) => {
                return url;
            }))
            .toString();

        return Promise.resolve(processed);
    }

    run(file) {
        return this.getFileContents(file)
            .then((contents) => {
                return this.rework(file, contents);
            });
    }
}

module.exports = SASS;
