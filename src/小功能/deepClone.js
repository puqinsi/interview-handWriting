function isObject(obj) {
  return typeof obj === "object" && obj != null;
}

/* 深拷贝 */
function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 查哈希表，已深拷贝对象直接返回

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 哈希表设值

  // 使用Reflect.ownKeys() 获取所有的键值，同时包括 Symbol
  Reflect.ownKeys(source).forEach(key => {
    if (isObject(source[key])) {
      target[key] = deepClone(source[key], hash);
    } else {
      target[key] = source[key];
    }
  });

  return target;
}

/* 浅拷贝 */
function shallowClone(source) {
  if (!isObject(source)) return source;
  const target = Array.isArray(source) ? [] : {};

  Object.keys(source).forEach(key => {
    target[key] = source[key];
  });

  return target;
}
