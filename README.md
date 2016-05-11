<p align="center">
  <a href="https://hellofresh.com">
    <img width="120" src="https://www.hellofresh.de/images/hellofresh/press/HelloFresh_Logo.png">
  </a>
</p>

# Lentil
**Smart and modular compiler**

[ ![Codeship Status for hellofresh/lentil](https://codeship.com/projects/eb51dcc0-69e1-0133-1fba-6e257542035e/status?branch=master)](https://codeship.com/projects/114688)

## How to install?

```bash
$ npm install --save lentil@git+ssh://git@github.com/hellofresh/lentil.git

$ npm install -g lentil@git+ssh://git@github.com/hellofresh/lentil.git
```

## What is Lentil?

Lentil is a tool that basically replaces your gulp workflow, it will run over all the CPU's that your machine has available for a smooth and fast as possible compilation time. The basic set-up will enforce a modular workflow and way of thinking on your developers, and with the easy-to-use and deep configuration, it will be very easy to set up a new project.

## Set-up

First you need a configuration file somewhere, your configuration file might just look like this one:

```js
// lentil-config.js
module.exports = {
    paths: {
        modules: __dirname + '/resources/modules',
        libs: __dirname + '/node_modules',
        dist: __dirname + '/public/dist'
    },
    libs: {
        'base': [
            __dirname + '/node_modules/jquery/dist/jquery.min.js',
        ],
    },
    ingredients: {
        ESLint: require('./.eslintrc'),
        Karma: {
            configFile: __dirname + '/karma.conf.js'
        },
    },
};
```

And that's it, that's your set-up, easy ain't it? (Actually you still need to add some files to your modules, let's get back to that later)

## Running it

If you've installed `lentil` globally, you might just run it by running:

```bash
$ lentil --configFile lentil-config.js
```

What this command will do is compile all the available modules. To make it more intricate we can add a `moduleName` and a `taskName`. Like so:

```bash
$ lentil {moduleName} {taskName} --configFile lentil-config.js
```

But person who built this awesome compiler, who do I compile my libs, or lint or test my javascript files. Well like this:

```bash
$ lentil lint --configFile lentil-config.js
$ lentil karma --configFile lentil-config.js
$ lentil libs --configFile lentil-config.js
```

[C'est simple](https://www.babbel.com/learn-french), there's also a couple of arguments we can add to this command to make it even better.

#### --minify

So we can also minify the files when we compile them, when you want to do this, just add `--minify` to your command, doesn't matter where, just add it.

```bash
$ lentil awesomeModule angular --configFile lentil-config.js --minify
$ lentil libs --configFile lentil-config.js --minify
$ lentil awesomeModule --configFile lentil-config.js --minify # this one will actually run all available tasks (haxzzz)
```

#### --watch

One of the bigger wins on compilers like `gulp` or `grunt` is the watcher built into `lentil`, thanks to the awesome [gaze](https://github.com/shama/gaze) library and combined with the split workers, watching files and re-compiling them has never been this fast.

```bash
$ lentil awesomeModule --configFile lentil-config.js --watch
$ lentil awesomeModule angular --configFile lentil-config.js --minify --watch # or combine the lot (winzzz)
```

#### --deploy

This is the master of all arguments, this will run all available compile tasks and also minify them on top of it.

```bash
$ lentil awesomeModule --configFile lentil-config.js --deploy
```

## Folder lay-out

Learn by example:

```
├── lentil-config.js
├── modules/
|   ├── base/
|   |   ├── sass/
|   |   |   ├── base.scss
|   ├── product/
|   |   ├── app/
|   |   |   ├── app.js
|   |   |   ├── ProductCtrl.js
|   |   |   ├── ProductFactory.js
|   |   ├── templates/
|   |   |   ├── product.html
|   |   ├── tests/  
|   |   |   ├── ProductCtrlSpec.js
|   |   |   ├── ProductFactorySpec.js
|   ├── shop/
|   |   ├── app/
|   |   |   ├── app.js
|   |   |   ├── components/
|   |   |   |   ├── SubscribeComponent.js
|   |   ├── tests/
|   |   |   ├── components/
|   |   |   |   ├── SubscribeComponentSpec.js
|   |   ├── sass/
|   |   |   ├── shop.scss
|   |   |   ├── components/
|   |   |   |   ├── _subscribe.scss
```

Simple as that!
