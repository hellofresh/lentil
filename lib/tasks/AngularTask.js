const Task = require('./Task');
const AngularTemplateCache = require('../ingredients/AngularTemplateCache');
const HTMLHint = require('../ingredients/HTMLHint');
const ESLint = require('../ingredients/ESLint');
const Uglify = require('../ingredients/Uglify');
const NgAnnotate = require('../ingredients/NgAnnotate');

class AngularTask extends Task {
    run(options) {
        var moduleFolderPath = this.getModuleFolderPath();
    }
}

module.exports = AngularTask;
