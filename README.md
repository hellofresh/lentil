# Lentil

This is the start of something great, new design and new FAST layout of dependency injection and overall client-based pages.

## Setup

Setting up Gulp Lentil is very easy, it will do most of the work for you, only thing you need to add is a comprehensive directory structure.

### Installation

Install `gulp-lentil` like this:

```bash
npm install --save-dev gulp-lentil;
```

### Configuration

To configure `gulp-lentil` load the package into your gulpfile and initialize it like this:

```js
var Lentil = require('gulp-lentil');

var lentil = new Lentil({
    paths: {
        modules: __dirname + '/modules',
        libs: __dirname + '/libs',
        dist: __dirname + '/dist',
        tmp: __dirname + '/../../tmp'
    },
    tasks: {
        'js': 'js',
        'app': 'angular',
        'sass': 'sass'
    },
    libs: {
        'base': [
            './libs/sugar/release/sugar-full.development.js',
            './libs/jquery/dist/jquery.js',
            './libs/angular/angular.js'
        ]
    }
});

lentil.start();
```

These are all the possible configuration options and if the assets are supplied well. It will run instantly out of the box. Just run `gulp help` to test it out. An example directory structure for this app would be:

```
gulpfile.js
modules
    base
        js
        app
        sass
libs
    sugar
    jquery
    angular
dist
```

This will generate the following files: `dist/base-libs.js`, `base-js.js`, `base-angular.js`, `base-sass.css`.

## Module development

> Making every page as modular as possible with the least assets as possible

The creation of a module is almost always connected to the creation of a page, unless you want to create a module that will be included by other modules. Like a module for all comment blocks etc.

Trying to captivate what is inside a module can be challenging, but one of the things you should try to hold onto is that every module should be able to run completely by itself without any help from other modules. Styling is a problem in this, that's why you should try to keep module-specific styling in the module, but add overall styling to the base module. This way we won't have double code (so actually it is a module by itself, with the base module).

The development of a module is very very easy, just add a folder to the modules folder that you defined in the configuration, with your desired name. Within this modules folder you can define your defined assets.

### JS

In this folder you could place any kind of JS file, whatever its structure or goal, as long as it belongs to the module. The Lentil compiler will eslint lint it and compile it to the dist folder as `{moduleName}-js.js`.

### Angular

This folder is for the angular apps, we will add ng annotate to the compiler and the file will also end up in the dist folder as `{moduleName}-angular.js`.

### Sass

This folder is for the scss/sass files that belong to the module. Please try to name the base SASS file to the name of the module, this will nice compile to `{moduleName}-sass.css` in the dist folder. The file will return an expanded version with nice comments and sourcemaps to help you with debugging.

### Libs

We also invented something nifty for the libs, if you want to add libs just add it to the lentil config. In which you could see a structure like this:

```
{
    'header': [
        './libs/modernizr/modernizr.js'
    ],
    'base': [
        './libs/jquery/dist/jquery.js',
        './libs/angular/angular.js'
    ]
}
```

In here you can specify the name of the bundle and which files belong to that bundle in the correct order. There is also a bower configuration in this project, please use it as much as possible to avoid version conflicts!

Have to add though, that because our beloved intfood still doesn't have a good deployment system, I added [preen](https://www.npmjs.com/package/preen) to the project. So after installing add only the files you will use for the project in the `bower.json` file. Like this:

```
"preen": {
  "angular": [
    "angular-csp.css",
    "angular.js"
  ],
  "angular-ui-router": [
    "release/angular-ui-router.js"
  ],
  "bootstrap": [
    "scss/**/*.scss"
  ],
  "jquery": [
    "dist/jquery.js"
  ]
}
```

And then run `preen` from the root folder. This will remove all the unneeded files from the tree, but the bower magic will remain.

## Compiling

This project uses a smart compiler built on `gulp`, if you're running into any trouble, most of the logic is in the lib folder of this project. This compiler will index all the tasks automatically. To see which tasks are found simply run:

```
./lentil.sh help
```

### Watching

Every task has its watcher, and there are also combined watchers, if you want to watch all tasks within that module, like: `base-watch` will watch the files that run `base-libs-bundle` and `base-sass`. To watch all files simply run:

```
./lentil.sh watch
```

### Bundle

If you just want to bundle all js's with no extra compiling done, run:

```
./lentil.sh bundle
```

### Testing

We have two tasks for running Karma unit tests:

**Watch task**
```
./lentil.sh karma-lentil
```
**Continuous Intergration single run task**
```
./lentil.sh karma-lentil-ci
```
