var watcherMap = new Map();

export const watcher = (obj, path, callback) => {
  watcherMap.set(obj, { value: obj[path], path, callback });
};
