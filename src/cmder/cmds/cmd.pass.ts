import { valueExtracter } from '../'

/**
 * Get password from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export default function pass (userInput: string) : string {
  try {
    return valueExtracter('PASS', userInput)
  } catch (tryErr) {
    return ''
  }
}