import { valueExtracter } from '../'
import Client from '../../client'

/**
 * Port command.
 * 
 * @export
 * @returns {void}
 */
export default function USER (clientInput: string, client: Client) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Info] Client ask server to work in "PORT" mode.')
  }

  let port = ''
  try {
    port = valueExtracter('PORT', clientInput)
  } catch (tryErr) {
    // Unknown commond or invalid value, return 500 to client.
    client.errorCmd()
  }

  // Connect to client port.
}
