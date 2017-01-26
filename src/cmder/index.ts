/**
 * Cmder is a module for command analysis and execution.
 * By LancerComet at 22:27, 2017.01.24.
 * # Carry Your World #
 */

// FTP Commands.
import user from './cmds/cmd.user'
import pass from './cmds/cmd.pass'
import quit from './cmds/cmd.quit'
import syst from './cmds/cmd.syst'
import pasv from './cmds/cmd.pasv'
import port from './cmds/cmd.port'

// Build-in commands.
import help from './cmds/cmd.help'

import commander from './utils/cmder'
import valueExtracter from './utils/value-extracter'

const cmds = { 
  // FTP commands.
  pass,
  pasv,
  port,
  quit,
  syst,
  user,

  // Build-in commands.
  help,
  exit: quit,
}

export {
  cmds,

  commander,
  valueExtracter
}
