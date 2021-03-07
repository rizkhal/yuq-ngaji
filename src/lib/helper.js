/**
 * Calculate audio duration
 *
 * @param {Number} seconds audio duration
 */
const timer = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  var hours = seconds / 3600;
  var minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
};

export { timer };

/**
 * Set all object value
 *
 * @param {Object} obj
 * @param {String|Number|Boolean|NULL} val
 */
export function setAll(obj, val) {
  Object.keys(obj).forEach(function(index) {
    obj[index] = val;
  });
}

/**
 * Set null a object
 *
 * @param {Object} obj
 */
export function setNull(obj) {
  setAll(obj, null);
}

/**
 * Highlight search query
 *
 * @param {String} content content
 * @param {String} keyword query of search
 */
export function highlight(content, keyword) {
  return content.replace(
    new RegExp(keyword, "gi"),
    (match) => `<mark>${match}</mark>`
  );
}
