import Client from '../../client'

/**
 * Quit Command.
 * Drop connection gracefully.
 * 
 * @export
 * @param {string} clientInput - Content sent from client, Always be "quit".
 * @returns {boolean}
 */
export default function QUIT (clientInput: string, client: Client) : boolean {
  client.disconnect()
  return true
}
