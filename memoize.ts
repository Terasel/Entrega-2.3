export const createCacheKeyFromArgs = (args: any[]) =>
    args.reduce((cacheKey, arg) => (cacheKey += `_${typeof arg === 'object' ? JSON.stringify(args) : `${arg}`}_`), '');

export const memoize: (...args: any[]) => any = function(fn) {
    const cache = new Map();
  
    return function(this:any) {
      const cacheKey = createCacheKeyFromArgs(Array.from(arguments));
  
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
  
      const asyncFn = fn.apply(this, arguments);
      cache.set(cacheKey, asyncFn);
      return asyncFn;
    };
  };