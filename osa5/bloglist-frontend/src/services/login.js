import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  
  const parsedCredentials = {
	  username: credentials.username.value,
	  password: credentials.password.value
  }
  
  const response = await axios.post(baseUrl, parsedCredentials)
  return response.data
}

export default { login }