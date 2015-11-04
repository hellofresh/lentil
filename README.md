# Lentil

This is the start of something great, new design and new FAST layout of dependency injection and overall client-based pages.

## Module development

> Making every page as modular as possible with the least assets as possible

The creation of a module is almost always connected to the creation of a page, unless you want to create a module that will be included by other modules. Like a module for all comment blocks etc.

Trying to captivate what is inside a module can be challenging, but one of the things you should try to hold onto is that every module should be able to run completely by itself without any help from other modules. Styling is a problem in this, that's why you should try to keep module-specific styling in the module, but add overall styling to the base module. This way we won't have double code (so actually it is a module by itself, with the base module).

The development of a module is very very easy, just add a folder to the modules folder in `alice/alice/public/lentil/modules`, with your desired name. Within this modules folder you can define 3 different assets: js, app and sass. We could have added more, but this is enough for now.

### JS

In this folder you could place any kind of JS file, whatever its structure or goal, as long as it belongs to the module. The Lentil compiler will eslint lint it and compile it to the dist folder as `{moduleName}.bundle.js`.

### App

This folder is for the angular apps, we will add ng annotate to the compiler and the file will also end up in the dist folder as `{moduleName}.app.bundle.js`.

### Sass

This folder is for the scss/sass files that belong to the module. Please try to name the base SASS file to the name of the module, this will nice compile to `{moduleName}.css` in the dist folder. The file will return an expanded version with nice comments and sourcemaps to help you with debugging.

### Libs

We also invented something nifty for the libs, if you check out your base folder of the lentil project, there is a `libs.json` file there. In wich you could see a structure like this:

```
{
    "header": [
        "./libs/modernizr/modernizr.js"
    ],
    "base": [
        "./libs/jquery/dist/jquery.js",
        "./libs/angular/angular.js"
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

This project uses a smart compiler built on `gulp`, if you're running into any trouble, most of the logic is in `alice/alice/public/lentil/Lentil.js`. This compiler will index all the tasks automatically. To see which tasks are found simply run:

```
./lentil.sh help
```

### Watching

Every task has its watcher, and there are also combined watchers, if you want to watch all tasks within that module, like: `base-watch` will watch the files that run `base-libs-bundle` and `base-sass`. To watch all files simply run:

```
./lentil.sh watch
```

### Deploying

Lentil has one simple deploy script, basically what it does is look at the dist folder and compile everything it can compile. It will `uglify` the js files and `csso` and `minify-css` the css files. In the end it will give you some stats on how big your files have become. Run the deploy script by typing in the command:

```
./lentil.sh deploy
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
