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

