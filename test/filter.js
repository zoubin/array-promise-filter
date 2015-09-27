var test = require('tap').test;
var filter = require('..');

test('async callback', function (t) {
  t.plan(2);
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
      t.same(res, ['CD', 'GH']);
    });
  filter(['ab', 'CD', 1, 'GH'], isUpperCase)
    .catch(function (err) {
      t.ok(err instanceof Error);
    });
});

test('promise callback', function (t) {
  t.plan(2);
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
      t.same(res, ['CD', 'GH']);
    });
  filter(['ab', 'CD', 1, 'GH'], isUpperCase)
    .catch(function (err) {
      t.ok(err instanceof Error);
    });
});

