# Angular

This is the ingredient for the `angular` compiling.

The angular pipeline looks like this:

- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [NG Annotate](https://www.npmjs.com/package/gulp-ng-annotate)
- [Concat](https://www.npmjs.com/package/gulp-concat)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:
```js
new Lentil({
  plugins: {
    ngAnnotate: {}
  }
});
```

Example configuration:
```js
new Lentil({
  plugins: {
    ngAnnotate: {
      single_quotes: true
    }
  }
});
```
