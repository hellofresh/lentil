# Deploy

This is the ingredient for deploying/minifying of assets.

The deploy pipeline looks like this:

## JS
- [uglifyJS](https://www.npmjs.com/package/gulp-uglify)
- [Rename](https://www.npmjs.com/package/gulp-rename)
- [Size](https://www.npmjs.com/package/gulp-size)

## CSS
- [CSSO](https://www.npmjs.com/package/gulp-csso)
- [minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [Rename](https://www.npmjs.com/package/gulp-rename)
- [Size](https://www.npmjs.com/package/gulp-size)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:

```js
new Lentil({
  plugins: {
    uglify: {
      mangle: false
    },
    minifyCss: {
      compatibility: 'ie9',
      aggressiveMerging: true,
      debug: true,
      processImport: true
    },
    rename: {
      suffix: '.min'
    }
    size: {
      showFiles: true
    }
  }
});
```
