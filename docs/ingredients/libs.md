# Libs

This is the ingredient for the concatting of libs.

The libs pipeline looks like this:

- [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [Concat](https://www.npmjs.com/package/gulp-concat)

### Example configurations in the `gulpfile.js`

For every libs file you can define your array library files, the key of the object will become the name of the file. So for example for the base libs file:

```js
new Lentil({
  libs: {
    'base': [
      'angular.js'
    ]
  }
});
```

This will generate a `base-libs.js` file in the `dist` folder.
