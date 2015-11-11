# Getting started

## Walktrough

This is a small step-by-step guide to get lentil and gulp up and running, we will get into the configuration later in this file.

#### 1. Installing gulp globally

```bash
$ npm install -g gulp
```

#### 2. Installing Lentil and gulp

```bash
$ npm install --save-dev lentil gulp
```

#### 3. Create a `gulpfile.js` in your project

This is the least you would need for a Lentil project to work. The paths don't even have to be there yet!

```js
var Lentil = require('lentil');

var lentil = new Lentil({
  paths: {
    modules: __dirname + '/public/modules',
    libs: __dirname + '/public/libs',
    dist: __dirname + '/public/dist',
    tmp: __dirname + '/tmp'
  },
  tasks: {
    'js': 'js',
    'app': 'angular',
    'sass': 'sass'
  }
});

lentil.start();
```

#### 4. Run `gulp`

Just run `gulp` in your project root:

```bash
$ gulp
```

## Configuration and setup

Lentil is being lead by the directory structure provided. The directory structure says everything about the app and naming should be considered twice to make it as comprehensible as possible. This is an example directory structure:

```
├── gulpfile.js
├── modules/
|   ├── libs/
|   |   ├── angular/
|   |   |   ├── angular.js
|   |   ├── boostrap-sass/
|   |   |   ├── scss/
|   |   |   |   ├── _grid.scss
|   ├── modules/
|   |   ├── base/
|   |   |   ├── sass/
|   |   |   |   ├── base.scss
|   |   ├── product/
|   |   |   ├── app/
|   |   |   |   ├── app.js
|   |   |   |   ├── ProductCtrl.js
|   |   |   |   ├── ProductFactory.js
|   |   |   ├── tests/  
|   |   |   |   ├── ProductCtrlSpec.js
|   |   |   |   ├── ProductFactorySpec.js
|   |   ├── shop/
|   |   |   ├── app/
|   |   |   |   ├── app.js
|   |   |   |   ├── components/
|   |   |   |   |   ├── SubscribeComponent.js
|   |   |   ├── tests/
|   |   |   |   ├── components/
|   |   |   |   |   ├── SubscribeComponentSpec.js
|   |   |   ├── sass/
|   |   |   |   ├── shop.scss
```

