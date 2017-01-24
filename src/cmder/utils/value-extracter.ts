/**
 * Reader value from expression.
 * 
 * @export
 * @param {string} command
 * @param {string} content
 * @returns
 */
export default function valueExtracter (command: string, content: string) {
  const match = content.match(new RegExp(`^${command}.+`))
  if (!match) { return '' }

  // Everything would be happened.
  try {
    const result = match[0].replace(`${command} `, '')
    return result

  // Return empty string when something happened.
  } catch (tryErr) {
    return ''
  }
}
