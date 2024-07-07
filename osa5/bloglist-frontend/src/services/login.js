import axios from 'axios'
const loginBaseUrl = '/api/login'

const login = async loginCredentials => {
  const response = await axios.post(loginBaseUrl, loginCredentials)
  return response.data
}

export default { login }
