const Ingredient = require('./Ingredient');
const rework = require('rework');
const reworkImporter = require('rework-importer');

class CSSImportIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({}, this.getIngredientConfig('CSSImport'));
    }

    rework(contents) {
        if (!contents.match('@import')) {
            return Promise.resolve(contents);
        }

        try {
            const distPath = this.config.get('paths.dist');

            var processed = rework(contents, 'utf-8')
                .use(reworkImporter({
                    path: distPath + '/test.css',
                    base: distPath
                }))
                .toString();
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(processed);
    }

    run(moduleName, contents) {
        return this.rework(contents);
    }
}

module.exports = CSSImportIngredient;
