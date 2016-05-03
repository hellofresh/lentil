const Task = require('./Task');
const FileSystem = require('../FileSystem');

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

    compileLibs(options) {
        const libsConfig = this.config.get('libs');

        Promise.all(
            Object.keys(libsConfig).map((libsName) => {
                return {
                    name: libsName,
                    contents: FileSystem.concat(libsConfig[libsName])
            })
        );
    }
}

module.exports = LibsTask;
