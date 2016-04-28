# JS

This is the ingredient for the linting.

The linting pipeline looks like this:

- [ESLint](https://www.npmjs.com/package/gulp-eslint)
- [HTMLHint](https://www.npmjs.com/package/gulp-htmlhint)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file.

Default configuration:
```js
new Lentil({
  plugins: {
    htmlhint: {
      'tagname-lowercase': true
    },
    eslint: {
      plugins: [
        'angular'
      ],
      rules: {
        'angular/module-setter': 0,
        'angular/module-getter': 0,
        'angular/controller-as': 0
      }
    }
  }
});
```

Example configuration:
```js
new Lentil({
  plugins: {
    htmlhint: {
      'tagname-lowercase': false
    },
    eslint: {
      plugins: [
        'react'
      ],
      rules: {}
    }
  }
});
```
