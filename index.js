var asyncFilter = require('array-async-filter');
var $Promise = Promise || require('es6-promise').Promise;

module.exports = function (values, cb) {
  return new $Promise(function (resolve, reject) {
    asyncFilter(values, cb, function (err, results) {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

