# Karma

This is the ingredient for Karma. As you might know Karma doesn't require a gulp plugin, just this:

```js
new Server({
  configFile: __dirname + '/karma.conf.js',
  singleRun: true
}, done).start();
```

### Example configurations in the `gulpfile.js`

You can set the location of the configFile in Lentil like this:

```js
var lentil = new Lentil({
  karma: {
    configFile: __dirname + '/karma.conf.js'
  }
});
```

We will set the `singleRun` and `action` options ourselves. For `karma-lentil` the configuration is:

```js
{
  action: 'watch'
}
```

And for `karma-lentil-ci` the configuration is:

```js
{
  singleRun: true
}
```
