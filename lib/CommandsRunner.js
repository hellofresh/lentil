const Command = require('./Command');

class CommandsRunner {
    constructor(modules, tasks, options) {
        this.modules = modules;
        this.tasks = tasks;
        this.options = options;
    }

    seedCommands(numCpus = 1, options = {}, config = {}) {
        const commands = [];

        for (let moduleName of this.modules) {
            for (let taskName of this.tasks) {
                commands.push(
                    new Command(moduleName, taskName, options, config)
                );


                if (this.options.deploy) {
                    commands.push(
                        new Command(
                            moduleName,
                            taskName,
                            {
                                minify: !options.minify,
                            },
                            config
                        )
                    );
                }
            }
        }

        if (this.options.deploy) {
            commands.push(
                new Command(null, 'libs', {
                    minify: true,
                }, config)
            );

            commands.push(
                new Command(null, 'libs', {
                    minify: false,
                }, config)
            );
        }

        return commands.inGroups(numCpus);
    }
}

module.exports = CommandsRunner;
