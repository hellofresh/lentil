#!/usr/bin/env node

const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const Logger = require('../lib/Logger');


const argv = require('yargs').argv;
const args = argv._;

const handleException = (message) => {
    Logger.error(new Error(message));
    process.exit(1);
};

if (!argv.configFile) {
    handleException('No configFile specified.');
}

Logger.setLogLevel(argv.logLevel || process.env.LOG_LEVEL);

const taskNameArg = args[1];

if (cluster.isMaster) {
    Logger.info(`Welcome to lentil, you have ${numCpus} workers available.`);

    let tasks;
    if (!taskNameArg) {
        tasks = ['angular', 'js', 'sass'];
    } else {
        tasks = [taskNameArg];
    }

    const CWD = process.cwd();
    const config = require(`${CWD}/${argv.configFile}`); // eslint-disable-line global-require

    for (const taskName of tasks) {
        cluster.fork({
            RUN_TASK: taskName,
            config: JSON.stringify(config),
        });
    }

    cluster.on('exit', (worker) => {
        Logger.info(`Worker ID ${worker.process.pid} finished.`);
    });
} else {
    Logger.info('Starting worker.');

    const Lentil = require('..'); // eslint-disable-line global-require

    const lentil = new Lentil(JSON.parse(process.env.config));

    const moduleName = args[0];

    if (!argv.watch) {
        lentil.run(moduleName, process.env.RUN_TASK, {
            shouldMinify: argv.minify,
        }).then(() => {
            process.exit(0);
        });
    } else {
        lentil.watch(moduleName, process.env.RUN_TASK, {
            shouldMinify: argv.minify,
        });
    }
}
