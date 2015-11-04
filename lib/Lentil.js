module.exports = (function() {

    var gutil = require('gulp-util');
    var Config = require('./Config');
    var FileSystem = require('./FileSystem');
    var TaskRunner = require('./TaskRunner');
    var Bundler = require('./Bundler');
    var Tester = require('./Tester');
    var Deployer = require('./Deployer');

    var Lentil = function(config) {
        gutil.log('Initializing lentil...');
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

                var taskRunner = new TaskRunner(task);
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

            var taskRunner = new TaskRunner('libs');
            taskRunner.parse(this.config, {
                name: name,
                libs: libFiles
            });
        }
    };

    Lentil.prototype.start = function() {
        for (var i = 0; i < this.moduleNames.length; i++) {
            var moduleName = this.moduleNames[i];
            this.parseModule(moduleName);
        }

        this.parseLibs();

        var bundler = new Bundler(TaskContainer.getTaskNames());

        var basicTasks = Object.values(this.config.get('tasks'));
        basicTasks.push('libs');
        bundler.bundleModuleTasks(basicTasks, this.moduleNames);

        var deployer = new Deployer(basicTasks);
        deployer.deployTask(this.config);

        var tester = new Tester();
        tester.testTask(this.config);

        gulp.task('help', plugins.taskListing.withFilters(/:/));
    };

    return Lentil;

}());
