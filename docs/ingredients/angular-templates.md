# Angular templates

This is actually part of another ingredient, a sub-ingredient. You could add this task by itself in the task config, but it would just generate a temporary file in your designated `TMP` folder.

The angular templates pipeline looks like this:

- [HTMLHint](https://www.npmjs.com/package/gulp-htmlhint)
- [Angular Templatecache](https://www.npmjs.com/package/gulp-angular-templatecache)

### Example configurations in the `gulpfile.js`

You can overwrite the default configurations by adding plugins configuration to your `gulpfile.js` file. The `moduleName` of angular templates defaults to `lentil.{moduleName}` and the root to `lentil/{moduleName}/templates`.

```js
new Lentil({
  plugins: {
    htmlhint: {
      'tagname-lowercase': true
    },
    angularTemplatecache: {
      transformUrl: function() {}
    }
  }
});
```
