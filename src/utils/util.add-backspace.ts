/**
 * Add backspace to some string.
 * Same length to this string. 
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export default function addBackspace (str: string): string {
  let length = str.length
  while (length) {
    str += '\b'
    length--
  }
  return str
}
