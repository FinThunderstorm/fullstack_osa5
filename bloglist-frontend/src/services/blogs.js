import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log("tuotetaanko kutsua",request)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token},
  }

  const res = await axios.post(baseUrl, newBlog, config)

  return res.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token},
  }

  const res = await axios.delete(`${ baseUrl }/${id}`, config)

  return res.data
}

const update = (id, newBlog) => {
  const req = axios.put(`${ baseUrl }/${id}`, newBlog)
  return req.then(res => res.data)
}

export default { getAll, create, update, remove, setToken }