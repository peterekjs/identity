import type { TypeIdentity } from '../definitions'
import { describeType } from '../describe'
import { defineIdentity } from '../identity'

import { $number } from './primitives'

const $NaN: TypeIdentity<typeof NaN> = defineIdentity(
  describeType('NaN', (v: unknown): v is typeof NaN => $number.is(v) && isNaN(v))
)

export { $NaN }
