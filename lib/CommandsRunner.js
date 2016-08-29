const Command = require('./Command');

class CommandsRunner {
    constructor(modules, tasks, options) {
        this.modules = modules;
        this.tasks = tasks;
        this.options = options;
    }

    seedCommands(numberOfClusters = 1, options = {}) {
        const commands = [];

        for (let moduleName of this.modules) {
            for (let taskName of this.tasks) {
                commands.push(
                    new Command(moduleName, taskName, options)
                );


                if (this.options.deploy) {
                    commands.push(
                        new Command(
                            moduleName,
                            taskName,
                            {
                                minify: !options.minify,
                            }
                        )
                    );
                }
            }
        }

        if (this.options.deploy) {
            commands.push(
                new Command(null, 'libs', {
                    minify: true,
                })
            );

            commands.push(
                new Command(null, 'libs', {
                    minify: false,
                })
            )
        }

        return commands.inGroups(numberOfClusters);
    }
}

module.exports = CommandsRunner;
