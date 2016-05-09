#!/usr/bin/env node
require('sugar');

const cluster = require('cluster');
const fs = require('fs');
const path = require('path');
const numCpus = require('os').cpus().length;
const Logger = require('../lib/Logger');
const FileSystem = require('../lib/FileSystem');
const Command = require('../lib/Command');
const CommandsRunner = require('../lib/CommandsRunner');

const argv = require('yargs').argv;
const args = argv._;

if (!argv.configFile) {
    throw new Error('No configFile specified.');
}

const CWD = process.cwd();
const config = require(`${CWD}/${argv.configFile}`); // eslint-disable-line global-require

Logger.setLogLevel(argv.logLevel);

let modules;
if (!args[0]) {
    try {
        var modulesPath = config.paths.modules;
    } catch (e) {
        throw new Error('Path to modules not defined in configuration.');
    }

    const availableModules = fs.readdirSync(modulesPath).filter(function(file) {
        return fs.statSync(path.join(modulesPath, file)).isDirectory();
    });

    modules = [availableModules];
} else {
    modules = [args[0]];
}

let tasks;
if (!args[1]) {
    tasks = ['angular', 'js', 'sass'];
} else {
    tasks = [args[1]];
}

if (cluster.isMaster) {
    Logger.info(`Welcome to lentil, you have ${numCpus} workers available.`);

    const commandsRunner = new CommandsRunner(modules, tasks);

    const commands = commandsRunner.seedCommands(numCpus, argv, config);

    Promise.all(
        commands.filter(
            (commandCollection) => commandCollection.length
        ).map(
            (commandCollection) => new Promise((resolve, reject) => {
                const worker = cluster.fork({
                    commands: JSON.stringify(commandCollection),
                });

                worker.on('message', (data) => {
                    worker.kill('SIGTERM');

                    if (data.event === 'finished') {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            })
        )
    ).then((result) => {
        const hasError = result.length && result.sum(
            (worker) => worker.errorCount || 0
        ) > 0;

        if (hasError) {
            process.exit(1);
        } else {
            process.exit(0);
        }
    }).catch((err) => {
        Logger.error(err);
    });
} else {
    Logger.info('Starting worker.');

    const rawCommands = JSON.parse(process.env.commands);

    for (let rawCommand of rawCommands) {
        const command = Command.ofRaw(rawCommand);

        command.run();
    }
}
