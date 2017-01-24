import { Client } from '../../model'

/**
 * Buildin command: quit.
 * Drop connection gracefully.
 * 
 * @export
 * @param {string} userInput - Content sent from client, Always be "quit".
 * @returns {boolean}
 */
export default function quit (userInput: string, client: Client) : boolean {
  client.disconnect('200 Bye.')
  return true
}
