/*
 *  Document Script By LancerComet at 21:01, 2016.11.26.
 *  # Carry Your World #
 */

import { tokenizer } from './tokenizer'
import { parser } from './parser'
import * as expression from './expressions'

export {
  tokenizer,
  parser,
  expression
}

// Usage:
// const token = tokenizer('USER address PASS microsoft')
// const ast = <AST> parser(token)
