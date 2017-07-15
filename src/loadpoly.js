/* global Promise */
export default function loadPolyfills(arr) {
  const promises = arr
    .map(e => e.test ? null : e.load())
    .filter(e => e);

  return Promise.all(promises);
}
