var filter = require('..');
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

