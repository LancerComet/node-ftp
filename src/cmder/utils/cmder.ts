import { Socket } from 'net'
import Client from '../../client'
import { cmds } from '../'

/**
 * Read Command Function.
 * 
 * @param {string} userCmd Command given by command.
 * @param {Client} [client]
 * @returns {string}
 */
export default function commander (userCmd: string, client?: Client) : string {
  const matching = userCmd.match(/^\S+/)
  if (!matching) { return '' }

  const cmd = matching[0].toLowerCase()  // Convert all commands to lowercase.
  if (!cmds[cmd]) { return '' }

  try {
    return cmds[cmd](userCmd, client)
  } catch (tryErr) {
    console.error(`[Error] Commander Error: ${tryErr}`)
    return ''
  }
}
