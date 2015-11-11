# SASS

This is the ingredient for the `SASS` compiling.

The SASS pipeline looks like this:

- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [SASS](https://www.npmjs.com/package/gulp-sass)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:
```js
new Lentil({
  paths: {
    libs: __dirname + '/libs'
  },
  plugins: {
    sass: {
      includePaths: config.get('paths.libs'), // The libs in your paths config
      outputStyle: 'expanded',
      sourceComments: true
    }
  }
});
```
