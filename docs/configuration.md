# Configuration

Lentil is being lead by the directory structure provided. The directory structure says everything about the app and naming should be considered twice to make it as comprehensible as possible. This is an example directory structure:

```
├── gulpfile.js
├── modules/
|   ├── libs/
|   |   ├── angular/
|   |   |   ├── angular.js
|   |   ├── boostrap-sass/
|   |   |   ├── scss/
|   |   |   |   ├── _grid.scss
|   ├── modules/
|   |   ├── base/
|   |   |   ├── sass/
|   |   |   |   ├── base.scss
|   |   ├── product/
|   |   |   ├── app/
|   |   |   |   ├── app.js
|   |   |   |   ├── ProductCtrl.js
|   |   |   |   ├── ProductFactory.js
|   |   |   ├── templates/
|   |   |   |   ├── product.html
|   |   |   ├── tests/  
|   |   |   |   ├── ProductCtrlSpec.js
|   |   |   |   ├── ProductFactorySpec.js
|   |   ├── shop/
|   |   |   ├── app/
|   |   |   |   ├── app.js
|   |   |   |   ├── components/
|   |   |   |   |   ├── SubscribeComponent.js
|   |   |   ├── tests/
|   |   |   |   ├── components/
|   |   |   |   |   ├── SubscribeComponentSpec.js
|   |   |   ├── sass/
|   |   |   |   ├── shop.scss
|   |   |   |   ├── components/
|   |   |   |   |   ├── _subscribe.scss
```

This example layout will generate a couple of files in the `dist` folder. For the different modules it will generate:

##### base
* `base.css`

##### product
* `product-angular.js`
  * Will also add `modules/product/templates/product.html` to the `$templateCache`

##### shop
* `shop-angular.js`
* `shop.css`

## Help

After configuring you could run `$ gulp help` to see which tasks have been created.
