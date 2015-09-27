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

