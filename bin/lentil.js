#!/usr/bin/env node

const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const Logger = require('../lib/Logger');


const argv = require('yargs').argv;
const args = argv._;

if (!argv.configFile) {
    handleException('No configFile specified.');
}

Logger.setLogLevel(argv.logLevel || process.env.LOG_LEVEL);

const taskName = args[1];

var tasks;
if (!taskName) {
    tasks = ['angular', 'js', 'sass'];
} else {
    tasks = [taskName];
}

if (cluster.isMaster) {
    Logger.info(`Welcome to lentil, you have ${numCpus} workers available.`);

    const CWD = process.cwd();
    const config = require(CWD + '/' + argv.configFile);

    for (let taskName of tasks) {
        cluster.fork({
            RUN_TASK: taskName,
            config: JSON.stringify(config)
        });
    }

    cluster.on('exit', (worker, code, signal) => {
        Logger.info(`Worker ID ${worker.process.pid} finished.`);
    });
} else {
    Logger.info('Starting worker.');

    const Lentil = require('..');

    const lentil = new Lentil(JSON.parse(process.env.config));

    const moduleName = args[0];

    lentil.run(moduleName, process.env.RUN_TASK, {
        shouldMinify: argv.minify
    }).then(() => {
        process.exit(0);
    });
}

function handleException(message) {
    Logger.error(new Error(message));
    process.exit(1);
}
