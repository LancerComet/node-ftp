import { valueExtracter } from '../'

/**
 * Get password from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export default function PASS (userInput: string) : string {
  try {
    return valueExtracter('PASS', userInput)
  } catch (tryErr) {
    return ''
  }
}