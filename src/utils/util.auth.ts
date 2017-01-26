export function getPassword (username: string) {
  // Requiring in function can get latest content from file.
  const appConfig: IAppConfig = require('../../config.json')
  
  const users = appConfig.users
  const matching = users.filter(item => item.username === username)[0]
  return matching
    ? matching.password
    : false
}