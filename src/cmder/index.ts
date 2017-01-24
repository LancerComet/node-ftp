import user from './cmds/cmd.user'
import pass from './cmds/cmd.pass'
import help from './cmds/cmd.help'

import cmder from './utils/cmder'
import valueExtracter from './utils/value-extracter'

const cmds = { 
  USER: user,
  PASS: pass,

  // Build-in commands.
  help
}

export {
  cmds,

  cmder,
  valueExtracter
}
