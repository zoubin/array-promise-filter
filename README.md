# array-promise-filter
filter an array through async callback

## Usage

```javascript
var filter = require('array-promise-filter');
var promisify = require('node-promisify');
var gt2 = promisify(function (n, m, cb) {
    process.nextTick(function () {
        var err = n <= m ? new Error('not greater') : null;
        cb(err, n << 1);
    });
});
filter([1,2,3,4,5,6], gt2, 3).then(function (res) {
    console.log(res);   // [8,10,12]
});

```

### filter(values, fnReturnPromise, arg1, arg2,...)

* values: *Array*
* fnReturnPromise: some async function which return a promise. The first argument given to this function is an element from `values`, and the rest are from `arg1`, `arg2`,...

You can use tools like [node-promisify](https://www.npmjs.com/package/node-promisify) to make a callback-style async function to a promise-style async function.
