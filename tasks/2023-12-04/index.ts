type MemoizedFunction<T extends (...args: any[]) => any> = T & {
  cache: Map<string, ReturnType<T>>;
};

export function memoize<T extends (...args: any[]) => any>(
  fn: T
): MemoizedFunction<T> {
  if (typeof fn !== "function") {
    throw new Error("Function to be memoized must be a function.");
  }

  const cache = new Map<string, ReturnType<T>>();

  const memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };

  memoizedFn.cache = cache;

  return memoizedFn as MemoizedFunction<T>;
}
