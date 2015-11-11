# JS

This is the ingredient for the `js` compiling.

The js pipeline looks like this:

- [ESLint](https://www.npmjs.com/package/gulp-eslint)
- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [Concat](https://www.npmjs.com/package/gulp-concat)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:
```js
new Lentil({
  plugins: {
    eslint: {}
  }
});
```

Example configuration:
```js
new Lentil({
  plugins: {
    eslint: require('./eslintconfig.json')
  }
});
```
