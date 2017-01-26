import Client from '../../client'

/**
 * PASV command.
 * 
 * @export
 */
export default function USER (clientInput: string, client: Client) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Info] Client ask server to work in "PASV" mode.')
  }
}
