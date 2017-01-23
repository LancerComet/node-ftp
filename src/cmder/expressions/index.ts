import * as USER from './expressions/exp.user'
import * as PASS from './expressions/exp.pass'

import { Expression } from './class.Expression'
import { Variable } from './class.Variable'

/**
 * Expressions in document script.
 * @type {Array<string>}
 * @export
 */
export const EXPRESSION_LIST = [
  'USER', 'PASS'
]

export {
  USER,
  PASS,
  Expression,
  Variable
}
