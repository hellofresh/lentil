const Task = require('./Task');
const AngularTemplateCache = require('../ingredients/AngularTemplateCache');
const HTMLHint = require('../ingredients/HTMLHint');
const ESLint = require('../ingredients/ESLint');
const Uglify = require('../ingredients/Uglify');
const NgAnnotate = require('../ingredients/NgAnnotate');

class JsTask extends Task {
    run(options) {

    }
}

module.exports = JsTask;
