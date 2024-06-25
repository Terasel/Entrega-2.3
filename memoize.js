"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = exports.createCacheKeyFromArgs = void 0;
var createCacheKeyFromArgs = function (args) {
    return args.reduce(function (cacheKey, arg) { return (cacheKey += "_".concat("".concat(arg), "_")); }, '');
};
exports.createCacheKeyFromArgs = createCacheKeyFromArgs;
var memoize = function (fn) {
    var cache = new Map();
    return function () {
        var cacheKey = (0, exports.createCacheKeyFromArgs)(Array.from(arguments));
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }
        var asyncFn = fn.apply(this, arguments);
        cache.set(cacheKey, asyncFn);
        return asyncFn;
    };
};
exports.memoize = memoize;
