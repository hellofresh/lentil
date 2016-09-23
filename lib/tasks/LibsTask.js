const Task = require('./Task');
const FileSystem = require('../FileSystem');
const Timer = require('../Timer');
const Logger = require('../Logger');
const UglifyIngredient = require('../ingredients/UglifyIngredient');

class LibsTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.compileLibs(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Libs task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);

                return Promise.reject(err);
            });
    }

    collectAllLibFiles(libsConfig) {
        return Promise.all(
            Object.keys(libsConfig).map((name) =>
                FileSystem.concat(libsConfig[name])
                    .then((contents) => ({ name, contents }))
            )
        );
    }

    compileLibs(options) {
        const libsConfig = this.config.get('libs');

        if (!this.moduleName || !(this.moduleName in libsConfig)) {
            return this.collectAllLibFiles(libsConfig)
                .then((collectedLibs) => {
                    if (!options.minify) {
                        return collectedLibs;
                    }

                    const minifiedLibs = collectedLibs.map((lib) => {
                        const uglifyIngredient = new UglifyIngredient(
                            this.config, options
                        );

                        const uglified = uglifyIngredient.run(lib.contents);

                        Logger.debug(`Uglified libs code for ${lib.name}:`,
                            uglified);

                        lib.name === 'locale-en-gb' && console.log('uglified', uglified);

                        return {
                            name: lib.name,
                            contents: uglified,
                        };
                    });

                    return minifiedLibs;
                })
                .then((parsedLibs) =>
                    parsedLibs.map((lib) =>
                        this.writeDistFile(
                            lib.name, 'libs', 'js', lib.contents,
                            options.minify
                        )
                    )
                );
        }

        return FileSystem.concat(libsConfig[this.moduleName])
            .then((contents) => {
                if (!options.minify) {
                    return Promise.resolve(contents);
                }

                const uglifyIngredient = new UglifyIngredient(this.config,
                    options);

                const uglified = uglifyIngredient.run(contents);

                Logger.debug(
                    `Uglified libs code for ${this.moduleName}:`,
                    uglified
                );

                return uglified;
            })
            .then(
                (contents) =>
                    this.writeDistFile(
                        this.moduleName, 'libs', 'js', contents, options.minify
                    )
            );
    }

    getRelevantFiles() {
        const libsConfig = this.config.get('libs');

        if (this.moduleName) {
            return libsConfig[this.moduleName];
        }

        return Object.values(libsConfig).flatten();
    }
}

module.exports = LibsTask;
