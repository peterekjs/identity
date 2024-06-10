import { AssertionError } from './errors'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message, { cause: { condition }})
  }
}

function isObject<T extends object & {}>(input: unknown): input is T {
  return typeof input === 'object' && !!input
}

export { assert, isObject }
