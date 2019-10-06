import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const newCreds = {
    'username': credentials.username.value,
    'password': credentials.password.value
  }
  const res = await axios.post(baseUrl, newCreds)
  return res.data
}

export default { login }