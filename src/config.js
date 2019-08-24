export const API_URL = process.env.NODE_ENV === 'production'
? 'https://__PROD_ADDR__.azurewebsites.com'
: 'http://localhost:7071/api'