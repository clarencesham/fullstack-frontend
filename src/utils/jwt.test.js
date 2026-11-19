import { getUserIDFromToken } from './jwt'

const createToken = claims => {
  const payload = window.btoa(JSON.stringify(claims))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return `header.${payload}.signature`
}

test('reads the user ID from the backend login token', () => {
  expect(getUserIDFromToken(createToken({ user_id: 42 }))).toBe(42)
})

test('rejects a token without a valid user ID', () => {
  expect(() => getUserIDFromToken('invalid')).toThrow()
  expect(() => getUserIDFromToken(createToken({ user_id: 0 }))).toThrow()
})
