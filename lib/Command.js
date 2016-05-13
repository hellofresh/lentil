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

        if (this.options.watch) {
            return lentil.watch(this.moduleName, this.taskName, this.options);
        }

        return lentil.run(this.moduleName, this.taskName, this.options);
    }

    static ofRaw(rawCommand, config) {
        return new Command(rawCommand.moduleName, rawCommand.taskName, rawCommand.options, config);
    }
}

module.exports = Command;
