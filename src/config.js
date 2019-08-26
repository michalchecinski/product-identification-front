export const API_URL = process.env.NODE_ENV === 'production'
? '__PROD_ADDR__'
: 'http://localhost:7071/api'