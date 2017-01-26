import { valueExtracter } from '../'
import Client from '../../client'

/**
 * Get password from user input.
 * 
 * @export
 * @param {string} str
 * @return {void}s
 */
export default function PASS (clientInput: string, client: Client) {
  let password = ''
  try {
    password = valueExtracter('PASS', clientInput)
  } catch (tryErr) {
    // ...
  }
  client.setLoginPassword(password)
  client.loginAuth()
}