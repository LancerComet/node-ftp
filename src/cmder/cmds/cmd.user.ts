import { valueExtracter } from '../'

/**
 * Get username from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export default function user (userInput: string) : string {
  try {
    return valueExtracter('USER', userInput)    
  } catch (tryErr) {
    return ''
  }
}
