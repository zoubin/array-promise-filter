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

