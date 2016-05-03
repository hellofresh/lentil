const Task = require('./Task');
const FileSystem = require('../FileSystem');
const Timer = require('../Timer');
const Logger = require('../Logger');
const UglifyIngredient = require('../ingredients/UglifyIngredient');

class LibsTask extends Task {
    run(options) {
        const moduleFolderPath = this.getModuleFolderPath();

        const timer = new Timer;
        timer.start();

        return this.compileLibs(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.log(`Libs task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err.message, err);
            });
    }

    collectAllLibFiles(libsConfig) {
        return Promise.all(
            Object.keys(libsConfig).map((libsName) => {
                return FileSystem.concat(libsConfig[libsName])
                    .then((contents) => {
                        return {
                            name: libsName,
                            contents: contents
                        };
                    });
            })
        );
    }

    compileLibs(options) {
        const libsConfig = this.config.get('libs');

        if (!this.moduleName) {
            return this.collectAllLibFiles(libsConfig)
                .then((collectedLibs) => {
                    if (!options.shouldMinify) {
                        return Promise.resolve(collectedLibs);
                    }

                    collectedLibs.map((lib) => {
                        const uglifyIngredient = new UglifyIngredient(this.config, options);

                        const uglified = uglifyIngredient.run(lib.contents);

                        Logger.debug(`Uglified libs code for ${lib.name}:`, uglified);

                        lib.contents = uglified;

                        return lib;
                    });
                })
                .then((collectedLibs) => {
                    return Promise.all(
                        collectedLibs.map((lib) => {
                            return this.writeDistFile(lib.name, 'libs', 'js', lib.contents, options.shouldMinify);
                        })
                    );
                });
        }

        return FileSystem.concat(libsConfig[this.moduleName])
            .then((contents) => {
                if (!options.shouldMinify) {
                    return Promise.resolve(contents);
                }

                const uglifyIngredient = new UglifyIngredient(this.config, options);

                const uglified = uglifyIngredient.run(contents);

                Logger.debug(`Uglified libs code for ${this.moduleName}:`, uglified);

                return uglified;
            })
            .then((contents) => {
                return this.writeDistFile(this.moduleName, 'libs', 'js', contents, options.shouldMinify);
            });
    }
}

module.exports = LibsTask;
