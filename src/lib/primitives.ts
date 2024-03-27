import type { TypeIdentity } from '../definitions'
import { describeType } from '../describe'
import { defineIdentity } from '../identity'
import { mergeTypes } from '../merge'

const $bigint: TypeIdentity<bigint> = defineIdentity(describeType('bigint', (v): v is bigint => typeof v === 'bigint'))
const $boolean: TypeIdentity<boolean> = defineIdentity(describeType('boolean', (v): v is boolean => typeof v === 'boolean'))
const $function: TypeIdentity<(...args: any[]) => any> = defineIdentity(describeType('function', (v): v is ((...args: any[]) => any) => typeof v === 'function'))
const $number: TypeIdentity<number> = defineIdentity(describeType('number', (v): v is number => typeof v === 'number'))
const $object: TypeIdentity<object & {}> = defineIdentity(describeType('object', (v): v is object => typeof v === 'object' && !!v))
const $string: TypeIdentity<string> = defineIdentity(describeType('string', (v): v is string => typeof v === 'string'))
const $symbol: TypeIdentity<symbol> = defineIdentity(describeType('symbol', (v): v is symbol => typeof v === 'symbol'))
const $undefined: TypeIdentity<undefined> = defineIdentity(describeType('undefined', (v): v is undefined => typeof v === 'undefined'))


// Not exactly primitives, but are widely used as these contain basic characteristics
const $any: TypeIdentity<any> = defineIdentity(describeType('any', (v): v is any => true))
const $null: TypeIdentity<null> = defineIdentity(describeType('null', (v): v is null => v === null))
const $nil: TypeIdentity<null | undefined> = defineIdentity(mergeTypes($null.description, $undefined.description))
const $array: TypeIdentity<any[]> = defineIdentity(describeType('any[]', Array.isArray))


export {
  $any, $array, $bigint, $boolean, $function, $nil, $null, $number, $object, $string, $symbol, $undefined,
}
