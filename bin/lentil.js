#!/usr/bin/env node

const Lentil = require('..');
const Logger = require('../lib/Logger');

const argv = require('yargs').argv;
const args = argv._;

const CWD = process.cwd();

Logger.setLogLevel(argv.logLevel || process.env.LOG_LEVEL);

const moduleName = args[0];
const taskName = args[1];

var config = require(CWD + '/' + argv.configFile);

const lentil = new Lentil(config);

lentil.runModuleTask(moduleName, taskName, {
    shouldMinify: argv.minify
});
