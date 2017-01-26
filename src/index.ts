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

/// <reference path="index.d.ts" />

const appConfig: IAppConfig = require('../config.json')
const packageJSON = require('../package.json')

import * as net from 'net'
import * as process from 'process'
import * as os from 'os'

import Client from './client'
import * as utils from './utils'

createLocalServer()

// -------------- Definition goes below. --------------

/**
 * Create local ftp server.
 * 
 * @return {void}
 */
function createLocalServer () {
  const server = net.createServer(socket => {
    socket.write(utils.addBackspace(`220-Node-FTP (v${packageJSON.version}, running on ${os.type()}, ${os.arch()}.)\r\n220-# Carry Your World #\r\n`))
  })

  server.on('connection', clientOnConnect)

  server.on('error', err => {
    console.log('[Error] Error occured on ftp server: ', err)
    process.exit(1)
  })

  server.on('listening', () => {
    const info = server.address()
    console.log(`[Info] Server is on: ${info.address}:${info.port}`)
  })

  server.listen(appConfig.port_proto, appConfig.hostname)
}

/**
 * This function will be triggereds when a new client is trying to connect.
 * 
 * @param {net.Socket} socket
 */
async function clientOnConnect (socket: net.Socket) {
  const client = new Client(socket)
  await client.sendGreetingInfo()
  client.askForUsername()

  console.log('[Info] Connection idle.')
}
