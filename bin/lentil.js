#!/usr/bin/env node
require('sugar');

const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const Logger = require('../lib/Logger');


const argv = require('yargs').argv;
const args = argv._;

if (Number.isInteger(argv.logLevel)) {
    Logger.setLogLevel(argv.logLevel);
} else if (Number.isInteger(process.env.LOG_LEVEL)) {
    Logger.setLogLevel(process.env.LOG_LEVEL);
} else {
    Logger.setLogLevel(2);
}

const handleException = (message) => {
    Logger.error(new Error(message));
    process.exit(1);
};

if (!argv.configFile) {
    handleException('No configFile specified.');
}

const taskNameArg = args[1];

if (cluster.isMaster) {
    Logger.info(`Welcome to lentil, you have ${numCpus} workers available.`);

    let tasks;
    if (!taskNameArg) {
        tasks = ['angular', 'js', 'sass', 'lint', 'karma'];
    } else {
        tasks = [taskNameArg];
    }

    const CWD = process.cwd();
    const config = require(`${CWD}/${argv.configFile}`); // eslint-disable-line global-require

    Promise.all(
        tasks.map((taskName) => new Promise((resolve, reject) => {
            const worker = cluster.fork({
                RUN_TASK: taskName,
                config: JSON.stringify(config),
            });

            worker.on('message', (data) => {
                worker.kill('SIGTERM');

                if (data.event === 'finished') {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        }))
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

    const Lentil = require('..'); // eslint-disable-line global-require

    const lentil = new Lentil(JSON.parse(process.env.config));

    const moduleName = args[0];

    if (!argv.watch) {
        lentil.run(moduleName, process.env.RUN_TASK, {
            shouldMinify: argv.minify,
        }).then((result = {}) => {
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
    } else {
        lentil.watch(moduleName, process.env.RUN_TASK, {
            shouldMinify: argv.minify,
        });
    }
}
