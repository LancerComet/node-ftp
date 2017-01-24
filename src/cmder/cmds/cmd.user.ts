import { valueExtracter } from '../'

/**
 * Get username from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export default function USER (userInput: string) : string {
  try {
    return valueExtracter('USER', userInput)    
  } catch (tryErr) {
    return ''
  }
}
