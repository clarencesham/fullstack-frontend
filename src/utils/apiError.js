export const getApiErrorMessage = (error, fallbackMessage) => {
  const response = error && error.response
  const data = response && response.data

  if (data && typeof data.error === 'string') {
    return data.error
  }
  if (typeof data === 'string' && data.trim()) {
    return data.trim()
  }
  if (response) {
    return `${fallbackMessage} (HTTP ${response.status}).`
  }
  if (error && error.message && error.message !== 'Network Error') {
    return error.message
  }

  return fallbackMessage
}
