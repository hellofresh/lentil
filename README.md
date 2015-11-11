<p align="center">
  <a href="https://hellofresh.com">
    <img width="120" src="https://www.hellofresh.de/images/hellofresh/press/HelloFresh_Logo.png">
  </a>
</p>

# Lentil
**Machine learning modular gulp wrapper**

[ ![Codeship Status for hellofresh/lentil](https://codeship.com/projects/eb51dcc0-69e1-0133-1fba-6e257542035e/status?branch=master)](https://codeship.com/projects/114688)

## What is Lentil?

Lentil is a tool that runs next to gulp to make setting up your new projects less painful. It will simply compile your scripts out of the box! It will use all the popular compiling implementations for your website's frontend assets (ingredients). Currently it will compile plain JS, sass or scss and angular apps (`templateCache` is also included). Write us an issue of you feel like something is missing!

## Documentation

For Lentil's API docs see the [documentation page](/docs/README.md).

### Example `gulpfile.js`

```js
// Require the lentil package from the NPM package manager
var Lentil = require('lentil');

// Initialize the Lentil object with a config object that will take of the rest
var lentil = new Lentil({
    paths: {
        modules: __dirname + '/modules', // The path to where your different modules
        libs: __dirname + '/libs', // Where are your libs situated
        dist: __dirname + '/dist', // Where do you want the compiled files to end up
        tmp: __dirname + '/../tmp' // Location for the short lived files
    },
    tasks: { // Here we map the tasks with the folders inside the module
        'js': 'js', // So the plain JS files will be in the js folder
        'app': 'angular', // So the angular files will be in the folder named app
        'sass': 'sass'
    },
    libs: { // Here we define our different libs files
        'base': [
            './libs/sugar/release/sugar-full.development.js',
            './libs/jquery/dist/jquery.js',
            './libs/angular/angular.js'
        ],
        'touch': [
            './libs/angular-touch/angular-touch.js'
        ]
    },
    karma: { // Define the config for Karma here
        files: [
            './libs/angular-mocks/angular-mocks.js'
        ]
    }
});

// Start the compiler!
lentil.start();
```
