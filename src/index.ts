/// <reference path="index.d.ts" />

/**
 * Node-FTP
 * A tiny ftp server written in Node.js.
 * 
 * @author: LancerComet
 * @license: MIT
 * 
 * Copyright (c) 2017 LancerComet
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const appConfig: IAppConfig = require('../config.json')

import * as net from 'net'
import * as process from 'process'
import * as utils from './utils'
import onClientConnect from './client-on-connect'

createLocalServer()

// -------------- Definition goes below. --------------

/**
 * Create local ftp server.
 * 
 * @returns void
 */
function createLocalServer () {
  const server = net.createServer(socket => {
    socket.write(utils.addBackspace('Node-FTP (v0.1.0)\r\n'))
  })

  server.on('connection', onClientConnect)

  server.on('error', err => {
    console.log('[Error] Error Occured when create ftp server: ', err)
    process.exit(1)
  })

  server.on('listening', () => {
    const info = server.address()
    console.log(`[Info] Server is on: ${info.address}:${info.port}`)
  })

  server.listen(appConfig.port_proto, appConfig.hostname)
}
