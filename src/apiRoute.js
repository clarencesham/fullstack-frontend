 
const API_ROUTE = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'development'
    ? 'http://172.22.29.4:8080'
    : 'https://chodapi.com/api/v1'
)

export default API_ROUTE
