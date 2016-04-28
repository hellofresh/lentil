require('sugar');

module.exports = (function() {

    var plugins = require('gulp-load-plugins')();
    var gutil = require('gulp-util');
    var Config = require('./Config');
    var FileSystem = require('./FileSystem');
    var TaskRunner = require('./TaskRunner');
    var TaskContainer = require('./TaskContainer');
    var Bundler = require('./Bundler');
    var Tester = require('./Tester');
    var Deployer = require('./Deployer');

    var Lentil = function(gulp, config) {
        gutil.log('Initializing lentil...');
        this.gulp = gulp;
        this.config = new Config(config);
        this.moduleNames = FileSystem.getModuleNames(this.config);
    };

    Lentil.prototype.parseModule = function(moduleName) {
        gutil.log('Parsing module', moduleName);

        var tasks = this.config.get('tasks');
        for (var folder in tasks) {
            var task = tasks[folder];
            gutil.log('Parsing', folder, 'for task', task);

            if (FileSystem.hasFolder(this.config, moduleName, folder)) {
                gutil.log(moduleName, 'has', folder);

                var taskRunner = new TaskRunner(this.gulp, task);
                taskRunner.parse(this.config, {
                    name: moduleName,
                    folder: folder
                });
            }
        }
    };

    Lentil.prototype.parseLibs = function() {
        gutil.log('Parsing libs');

        var libs = this.config.get('libs');
        for (var name in libs) {
            var libFiles = libs[name];
            gutil.log('Parsing', name, 'for libs');

            var taskRunner = new TaskRunner(this.gulp, 'libs');
            taskRunner.parse(this.config, {
                name: name,
                libs: libFiles
            });
        }
    };

    Lentil.prototype.addLinting = function(moduleName) {
        var taskRunner = new TaskRunner(this.gulp, 'lint');

        taskRunner.parse(this.config, {
            name: moduleName
        });
    };

    Lentil.prototype.start = function() {
        for (var i = 0; i < this.moduleNames.length; i++) {
            var moduleName = this.moduleNames[i];
            this.parseModule(moduleName);

            this.addLinting(moduleName);
        }

        this.parseLibs();

        var bundler = new Bundler(this.gulp, TaskContainer.getTaskNames());

        var basicTasks = Object.values(this.config.get('tasks'));
        basicTasks.push('libs');
        bundler.bundleModuleTasks(basicTasks, this.moduleNames);

        var deployer = new Deployer(this.gulp, basicTasks);
        deployer.deployTask(this.config);
        deployer.quickDeployTask();

        var tester = new Tester(this.gulp);
        tester.testTask(this.config);

        this.gulp.task('help', plugins.taskListing.withFilters(/:/));
    };

    return Lentil;

}());
