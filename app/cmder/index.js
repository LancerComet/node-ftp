"use strict";
const cmd_user_1 = require('./cmds/cmd.user');
const cmd_pass_1 = require('./cmds/cmd.pass');
const cmd_help_1 = require('./cmds/cmd.help');
const cmd_quit_1 = require('./cmds/cmd.quit');
const cmder_1 = require('./utils/cmder');
exports.cmder = cmder_1.default;
const value_extracter_1 = require('./utils/value-extracter');
exports.valueExtracter = value_extracter_1.default;
const cmds = {
    USER: cmd_user_1.default,
    PASS: cmd_pass_1.default,
    help: cmd_help_1.default,
    exit: cmd_quit_1.default,
    quit: cmd_quit_1.default
};
exports.cmds = cmds;
