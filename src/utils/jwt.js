export const getUserIDFromToken = token => {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('The login response is not a valid token.')
  }

  let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  payload += '='.repeat((4 - payload.length % 4) % 4)

  const claims = JSON.parse(window.atob(payload))
  const userID = Number(claims.user_id)
  if (!Number.isSafeInteger(userID) || userID < 1) {
    throw new Error('The login token does not contain a valid user ID.')
  }

  return userID
}
