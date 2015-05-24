var test = require('tape');
var filter = require('..');
var promisify = require('node-promisify');

test('filter', function (t) {
    t.plan(1);
    var gt = promisify(function (n, m, cb) {
        process.nextTick(function () {
            var err = n <= m ? new Error('not greater') : null;
            cb(err, n);
        });
    });
    filter([1,2,3,4,5,6], gt, 3).then(function (res) {
        t.same(res, [4,5,6]);
    });
});
