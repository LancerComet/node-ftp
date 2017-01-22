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

import * as net from 'net'

// Variables definition.
const HOSTNAME = 'localhost'
const FTP_PORT_DATA = 20
const FTP_PORT_PROTO = 21

const CRLF = '\r\n'
const ASCII = 'A'
const BINARY = 'I'
const IMAGE = 'I'

createLocalServer()

// -------------- Definition goes below. --------------

/**
 * Create local ftp server.
 * 
 * @returns void
 */
function createLocalServer () {
  const server = net.createServer(socket => {
    socket.write('Hello!')
  })

  server.on('connection', onClientConnect)

  server.on('error', err => {
    console.log('[Error] Error Occured when create ftp server: ', err)
  })

  server.on('listening', () => {
    const info = server.address()
    console.log(`[Info] Server is on: ${info.address}:${info.port}`)
  })

  server.listen(FTP_PORT_PROTO, HOSTNAME)

}

/**
 * FTP client on connect event.
 * 
 * @param {net.Socket} socket
 */
function onClientConnect (socket: net.Socket) { 
  const clientInfo = {
    address: socket.remoteAddress,
    port: socket.remotePort
  }

  console.log('A client is here:', clientInfo)

  socket.on('connect', () => {
    console.log('new client is connected.')
  })

  socket.on('error', err => {
    console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err)
  })

  socket.on('data', (data: Buffer) => {
    console.log('data is coming: ', data)
    if (data.toString() === CRLF) {
      console.log('enter triggered.')
      askForPassword()      
    }
  })

  socket.on('drain', () => {
    console.log('ondrain')
  })

  socket.on('end', () => {
    console.log('end')
  })

  // Connect to client.
  socket.write('220 Greeting from NODE-FTP! :)\nPlease provide your username:')

  function askForPassword () {
    socket.write('331 Please specify the password.')
  }
}
