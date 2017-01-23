const appConfig: IAppConfig = require('../../config.json')

/**
 * Check both username and password.
 * 
 * @returns {boolean}
 */
export default function auth (username: string, password: string) : Boolean {
  return username === appConfig.username && password === appConfig.password
}
