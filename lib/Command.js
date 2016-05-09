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

        return lentil.run(this.moduleName, this.taskName, this.options);
    }

    static ofRaw(rawCommand) {
        return new Command(rawCommand.moduleName, rawCommand.taskName, rawCommand.options, rawCommand.config);
    }
}

module.exports = Command;
