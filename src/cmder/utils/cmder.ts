import { Socket } from 'net'
import { Client } from '../../model'
import { cmds } from '../'

/**
 * Read Command Function.
 * 
 * @param {string} userCmd Command given by command.
 * @param {Client} [client]
 * @returns {string}
 */
export default function commandReader (userCmd: string, client?: Client) : string {
  let matching = userCmd.match(/^\S+/)
  if (!matching) { return '' }

  let cmd = matching[0]
  if (!cmds[cmd]) { return '' }

  try {
    return cmds[cmd](userCmd, client)
  } catch (tryErr) {
    console.error(`[Error] ${tryErr}`)
    return ''
  }
}
