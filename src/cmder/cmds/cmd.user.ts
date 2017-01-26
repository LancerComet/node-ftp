import { valueExtracter } from '../'
import Client from '../../client'

/**
 * Get username from user input.
 * 
 * @export
 * @param {string} str
 * @return {void}
 */
export default function USER (clientInput: string, client: Client) {
  let username = ''
  try {
    username = valueExtracter('USER', clientInput)
  } catch (tryErr) {
    //...
  }
  client.setLoginUsername(username)
  client.askForPassword()
}
