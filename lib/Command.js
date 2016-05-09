const Lentil = require('./Lentil');
const Logger = require('./Logger');

class Command {
    constructor(moduleName, taskName, options, config) {
        this.moduleName = moduleName;
        this.taskName = taskName;
        this.options = options;
        this.config = config;
    }

    run() {
        const lentil = new Lentil(this.config);

        const deferred = lentil.run(this.moduleName, this.taskName, this.options);

        if (!this.options.watch) {
            deferred.then((result = {}) => {
                process.nextTick(() => {
                    Logger.info(`Worker ID ${process.pid} finished.`);

                    process.send({
                        event: 'finished',
                        errorCount: result.errorCount,
                    });
                });
            }).catch(() => {
                process.nextTick(() => {
                    Logger.info(`Worker ID ${process.pid} finished with errors.`);

                    process.send({
                        event: 'finished',
                        errorCount: 1,
                    });
                });
            });
        }
    }

    static ofRaw(rawCommand) {
        return new Command(rawCommand.moduleName, rawCommand.taskName, rawCommand.options, rawCommand.config);
    }
}

module.exports = Command;
