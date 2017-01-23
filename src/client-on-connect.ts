const appConfig: IAppConfig = require('../config.json')

import * as net from 'net'
import * as DEFINITION from './def'
import * as utils from './utils'

import { Client } from './model'

/**
 * This function will be triggereds when a new client is try to connect.
 * 
 * @export
 * @param {net.Socket} socket
 */
export default async function clientOnConnect (socket: net.Socket) {
  const client = new Client(socket)
  await client.sendGrretingInfo()  
  await client.startAuth()

  // Login Successfully.
  socket.write(utils.addBackspace(`Welcome back, ${appConfig.username}!\r\n`))

  // Register events.  
  client.registerEvents()

  console.log('[Info] Connection idle.')
}
