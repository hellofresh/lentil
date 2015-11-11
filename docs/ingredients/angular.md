# Angular

This is the ingredient for the `angular` compiling.

The angular pipeline looks like this:

- [ESLint](https://www.npmjs.com/package/gulp-eslint)
- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [NG Annotate](https://www.npmjs.com/package/gulp-ng-annotate)
- [Concat](https://www.npmjs.com/package/gulp-concat)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:
```js
new Lentil({
  plugins: {
    eslint: {},
    ngAnnotate: {}
  }
});
```

Example configuration:
```js
new Lentil({
  plugins: {
    eslint: require('./eslintconfig.json'),
    ngAnnotate: {
      single_quotes: true
    }
  }
});
```
