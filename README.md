# array-promise-filter
Filter an array through async callback.
The results can be accessed from the returned promise.

## res = filter(values, fn)

```javascript
var filter = require('array-promise-filter');

```

### values

Type: `Array`

The array to be filtered.

### fn

Type: `function`

`fn` should do one of the following.

#### Respect synchronous signature

`fn(val, index, arr)`

```javascript
var filter = require('..');
function isUpperCase(n) {
  return !n.split().some(function (c) {
    return c >= 'a';
  });
}
filter(['ab', 'CD', 'ef', 'GH'], isUpperCase)
  .then(function (res) {
    console.log(res); // ['CD', 'GH']
  })
  .catch(function (err) {
    console.log(err);
  });

```

#### Respect asynchronous signature

`fn(val, index, arr, next)`

`next(err, keep)` must be called when `fn` finishes.

```javascript
var filter = require('..');
function isUpperCase(n, i, arr, next) {
  process.nextTick(function () {
    try {
      next(null, !n.split().some(function (c) {
        return c >= 'a';
      }));
    } catch (e) {
      next(e);
    }
  });
}
filter(['ab', 'CD', 'ef', 'GH'], isUpperCase)
  .then(function (res) {
    console.log(res); // ['CD', 'GH']
  })
  .catch(function (err) {
    console.log(err);
  });

```

#### Return a promise

```javascript
var filter = require('..');
function isUpperCase(n) {
  return new Promise(function (rs, rj) {
    process.nextTick(function () {
      try {
        rs(!n.split().some(function (c) {
          return c >= 'a';
        }));
      } catch (e) {
        rj(e);
      }
    });
  });
}
filter(['ab', 'CD', 'ef', 'GH'], isUpperCase)
  .then(function (res) {
    console.log(res); // ['CD', 'GH']
  })
  .catch(function (err) {
    console.log(err);
  });

```

### res

Type: `Promise`


