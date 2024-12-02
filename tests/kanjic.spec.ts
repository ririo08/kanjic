import { expect, test } from 'vitest'
import { kanjic } from '../src/kanjic'

test('1111無量大数, Bigint', () => {
  expect(kanjic(111111111111111111111111111111111111111111111111111111111111111111111111n))
    .toBe('1111無量大数1111不可思議1111那由他1111阿僧祇1111恒河沙1111極1111載1111正1111澗1111溝1111穣1111𥝱1111垓1111京1111兆1111億1111万1111')
})

test('number型安全数 9007199254740991', () => {
  expect(kanjic(Number.MAX_SAFE_INTEGER)).toBe('9007兆1992億5474万991')
})