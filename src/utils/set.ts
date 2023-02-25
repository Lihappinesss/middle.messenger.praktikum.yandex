function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

type Indexed<T = unknown> = {
    [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isPlainObject(object)) {
    return object;
  }

  const pathArr = path.split('.');
  if (pathArr.length === 1) {
    object[path] = value;
  } else {
    let current = object;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length - 1) {
        current[pathArr[i]] = value;
      } else {
        current[pathArr[i]] = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        current = current[pathArr[i]];
      }
    }
  }

  return object;
}

export default set;
