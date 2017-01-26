import * as os from 'os'
import Client from '../../client'

export default function (clientInput: string, client: Client) {
  client.write(`215 UNIX Type: L8`)
}
