const Command = require('./Command');

class CommandsRunner {
    constructor(modules, tasks) {
        this.modules = modules;
        this.tasks = tasks;
    }

    seedCommands(numCpus = 1, options = {}, config = {}) {
        const commands = [];

        for (let moduleName of this.modules) {
            for (let taskName of this.tasks) {
                commands.push(new Command(moduleName, taskName, options, config));
            }
        }

        return commands.inGroups(numCpus);
    }
}

module.exports = CommandsRunner;
