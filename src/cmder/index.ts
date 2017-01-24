/**
 * Cmder is a module for command analysis and execution.
 * By LancerComet at 22:27, 2017.01.24.
 * # Carry Your World #
 */

// FTP Commands.
import USER from './cmds/cmd.user'
import PASS from './cmds/cmd.pass'

// Build-in commands.
import help from './cmds/cmd.help'
import quit from './cmds/cmd.quit'

import cmder from './utils/cmder'
import valueExtracter from './utils/value-extracter'

const cmds = { 
  // FTP commands.
  USER,
  PASS,

  // Build-in commands.
  help,
  exit: quit,
  quit
}

export {
  cmds,

  cmder,
  valueExtracter
}
