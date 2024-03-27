import type { PropDescriptions, TypeDescription, TypeFromPropDescriptions } from './definitions'
import { assert, hasOwn, isObject } from './helpers'

function describeType<T>(name: string, validate: (input: unknown) => input is T, props: (T extends {} ? (keyof T)[] : never[]) = [] as (T extends {} ? (keyof T)[] : never[])): TypeDescription<T> {
  return {
    name,
    validate,
    equals(a, b) {
      return validate(a) && validate(b) && a === b
    },
    get isObject() { return !!props.length },
    get props() { return [...props] as any[] },
  }
}

function describeInstance<T>(Ctor: new () => T): TypeDescription<T> {
  const props = Object.keys(Object.getOwnPropertyDescriptors(Ctor).prototype.value) as (keyof T)[]

  function validate(input: unknown): input is T {
    return input instanceof Ctor
  }

  return {
    name: Ctor.name,
    validate,
    equals(a, b) {
      return validate(a) && validate(b) && props.every(p => a[p] === b[p])
    },
    get isObject() { return true },
    get props() { return [...props] as any[] },
  }
}

function describeArray<T extends TypeDescription<any>>(description: T): T extends TypeDescription<infer S> ? TypeDescription<S[]> : never {
  function validate(input: unknown) {
    return Array.isArray(input) && input.every(description.validate)
  }

  return {
    name: `${description.name}[]`,
    validate,
    equals(a, b) {
      return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v) => description.equals(v, b))
    },
    get isObject() { return false },
    get props() { return [] as any[] },
  } as T extends TypeDescription<infer S> ? TypeDescription<S[]> : never
}

function describeObject<P extends PropDescriptions<{}>>(name: string, propDescriptions: P): TypeDescription<TypeFromPropDescriptions<P>> {
  assert(isObject(propDescriptions), 'prop descriptions')

  type T = TypeFromPropDescriptions<P>

  const props = Object.keys(propDescriptions) as (T extends {} ? keyof T : never)[]
  const getPropEntries = () => (Object.entries(propDescriptions) as [keyof T, TypeDescription<T[keyof T]>][])

  function validate(input: unknown): input is T {
    return isObject(input) && getPropEntries().every(([k, v]) => hasOwn(input, k) && v.validate(input[k]))
  }

  function equals(a: T, b: T) {
    return isObject(a) && isObject(b) && getPropEntries().every(([k, v]) => v.equals(a[k], b[k]))
  }

  return {
    name,
    validate,
    equals,
    get isObject() { return true },
    get props() { return [...props] as any[] },
  }
}

export { describeArray, describeInstance, describeObject, describeType }
