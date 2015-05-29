var arrayify = require('arrayify-slice');
module.exports = function (values, cb) {
    var args = arrayify(arguments, 2);
    var pending = values.length;
    var flagError = new Error('rejected');
    return new Promise(function (resolve) {
        var res = [];
        values.forEach(function (v, i) {
            cb.apply(null, [v].concat(args))
                .then(function (v) {
                    res[i] = v;
                    oneDone();
                }, function () {
                    res[i] = flagError;
                    oneDone();
                });
        });
        function oneDone() {
            if (--pending === 0) {
                resolve(res.filter(function (v) {
                    return v !== flagError;
                }));
            }
        }
    });
};

